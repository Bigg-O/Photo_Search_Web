import React, { Component } from 'react'
import SearchBar from './Components/SearchBar'
import PaginationBar from './Components/PaginationBar'
import NavigationBar from './Components/NavigationBar';
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
      isLoading: true,
      query: ""
    }
  }

  componentDidMount() {
    this.loadCuratedPhotos(this.state.currentPage)
  }

  loadCuratedPhotos = pageNum => {
    axios
      .get(PEXELS_PHOTOS_URL + `/curated?page=${pageNum}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY
        }
      }).then(resp => {
        console.log(resp)
        this.setState({ 
          photos: resp.data.photos,
          isLoading: false 
        })
      }).catch(err => {
        console.log(err);
      });
  }

  loadSearchPhotos = (query, pageNum) => {
    axios.
      get(PEXELS_PHOTOS_URL + `/search?query=${query}&page=${pageNum}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY
        }
      }).then(resp => {
        console.log(resp)
        this.setState({
          photos: resp.data.photos,
          currentPage: pageNum,
          onSearchMode: true,
          isLoading: false
        })
      }).catch(err => {
        console.log(err);
      });
  }

  handlePhotoSearch = e => {
    e.preventDefault()
    const query = e.target.query.value

    this.loadSearchPhotos(query, 1)
    this.setState({
      query: query,
      isLoading: true
    })
  }

  handlePageUpdate = newPage => {
    if (newPage <= 0) {
      return;
    } else {
      if (this.state.onSearchMode) {
        this.loadSearchPhotos(this.state.query, newPage)
      } else {
        this.loadCuratedPhotos(newPage)
      }
      this.setState({
        currentPage: newPage,
        isLoading: true
      })
    }
  }

  handleModeChange = e => {
    this.setState({ onSearchMode: false, currentPage: 1, isLoading: true })
    this.loadCuratedPhotos(1)
  }
  
  render() { 
    return (
      <Container fluid>
        <NavigationBar/>
        <SearchBar onSearch={this.handlePhotoSearch}/>
        <PhotoContainer 
          onSearchMode={this.state.onSearchMode}
          photos={this.state.photos}
          onReset={this.handleModeChange}
          isLoading={this.state.isLoading}
        />
        <PaginationBar currentPage={this.state.currentPage} onPageUpdate={this.handlePageUpdate}/>
      </Container>
    )
  }
}
  
export default App;
