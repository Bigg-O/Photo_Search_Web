import React, { Component } from 'react'
import SearchBar from './Components/SearchBar'
import './App.css';
import axios from "axios";

const PEXELS_PHOTOS_URL = "https://api.pexels.com/v1/curated"



export class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      photos: [],
      // isLoading: false
    }
  }

  handleDataLoad = () => {
    axios
      .get(PEXELS_PHOTOS_URL + `?page=${this.page}&per_page=10`, {
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_KEY
        }
      }).then(resp => {
        this.setState({ photos: resp.data.photos })
      }).catch(err => {
        console.log(err);
      });
  }
  
  render() { 
    return (
      <SearchBar/>

    }
  }
  

export default App;
