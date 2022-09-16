import React, { Component } from 'react'
import SearchBar from './Components/SearchBar'
import PaginationBar from './Components/PaginationBar'
import PhotoContainer from './Containers/PhotoContainer'
import './App.css';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const PEXELS_PHOTOS_URL = "https://api.pexels.com/v1/curated"
const PER_PAGE = 10

export class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      photos: [],
    }
  }

  componentDidMount() {
    this.handleDataLoad(this.state.currentPage)
  }

  handleDataLoad = pageNum => {
    axios
      .get(PEXELS_PHOTOS_URL + `?page=${pageNum}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY
        }
      }).then(resp => {
        this.setState({ photos: resp.data.photos })
      }).catch(err => {
        console.log(err);
      });
  }

  handlePageUpdate = newPage => {
    if (newPage <= 0) {
      return;
    } else {
      this.handleDataLoad(newPage)
      this.setState({currentPage: newPage})
    }
  }
  
  render() { 
    return (
      <Container>
        {/* <SearchBar/> */}
        <PhotoContainer photos={this.state.photos} />
        <PaginationBar currentPage={this.state.currentPage} onPageUpdate={this.handlePageUpdate}/>
      </Container>
    )
  }
}
  

export default App;
