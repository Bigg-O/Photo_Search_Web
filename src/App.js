import React, { Component } from 'react'
import SearchBar from './Components/SearchBar'
import PaginationBar from './Components/PaginationBar'
import PhotoContainer from './Containers/PhotoContainer'
import axios from "axios";
import Container from 'react-bootstrap/Container';

import './App.css';

const PEXELS_PHOTOS_URL = "https://api.pexels.com/v1"
const PER_PAGE = 10

export class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      photos: [],
      onSearchMode: false,
      query: ""
    }
  }

  componentDidMount() {
    this.handleDataLoad(this.state.currentPage)
  }

  handleDataLoad = pageNum => {
    axios
      .get(PEXELS_PHOTOS_URL + `/curated?page=${pageNum}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY2
        }
      }).then(resp => {
        console.log(resp)
        this.setState({ photos: resp.data.photos })
      }).catch(err => {
        console.log(err);
      });
  }

  handlePageUpdate = newPage => {
    if (newPage <= 0) {
      return;
    } else {
      if (this.state.onSearchMode) {
        this.handlePhotoSearch(this.state.query, newPage)
      } else {
        this.handleDataLoad(newPage)
      }
      this.setState({ currentPage: newPage })
    }
  }

  handleNewPhotoSearch = e => {
    e.preventDefault()
    const query = e.target.query.value

    this.handlePhotoSearch(query, 1)
    this.setState({ query: query })
  }

  handlePhotoSearch = (query, pageNum) => {
    axios.
      get(PEXELS_PHOTOS_URL + `/search?query=${query}&page=${pageNum}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY2
        }
      }).then(resp => {
        console.log(resp)
        this.setState({
          photos: resp.data.photos,
          currentPage: pageNum,
          onSearchMode: true
        })
      }).catch(err => {
        console.log(err);
      });
  }

  handleReset = e => {
    this.setState({ onSearchMode: false })
    this.handleDataLoad(1)
  }
  
  render() { 
    return (
      <Container>
        <SearchBar onSearch={this.handleNewPhotoSearch}/>
        <PhotoContainer onSearchMode={this.state.onSearchMode} photos={this.state.photos}  onReset={this.handleReset}/>
        <PaginationBar currentPage={this.state.currentPage} onPageUpdate={this.handlePageUpdate}/>
      </Container>
    )
  }
}
  

export default App;
