import React, { Component } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';

class PaginationBar extends Component {
  validateNum = num => {
    if (num <= 0) {
      return "-"
    } else {
      return num
    }
  }

  render() { 
    const { validateNum } = this
    const { currentPage, onPageUpdate } = this.props
    const minusTwo = currentPage - 2
    const minusOne = currentPage - 1
    const plusOne = currentPage + 1
    const plusTwo = currentPage + 2

    return (
      <Pagination>
        <Pagination.Prev onClick={() => onPageUpdate(minusOne)}/>

        <Pagination.Item onClick={() => onPageUpdate(minusTwo)}> {validateNum(minusTwo)} </Pagination.Item>
        <Pagination.Item onClick={() => onPageUpdate(minusOne)}> {validateNum(minusOne)} </Pagination.Item>
        <Pagination.Item active> {currentPage} </Pagination.Item>
        <Pagination.Item onClick={() => onPageUpdate(plusOne)}> {plusOne} </Pagination.Item>
        <Pagination.Item onClick={() => onPageUpdate(plusTwo)}> {plusTwo} </Pagination.Item>
        
        <Pagination.Next onClick={() => onPageUpdate(plusOne)}/>
      </Pagination>
    );
  }
}
 
export default PaginationBar;