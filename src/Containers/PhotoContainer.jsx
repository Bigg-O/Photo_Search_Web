import React, { Component } from "react";
import CardGroup from "react-bootstrap/CardGroup"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class PhotoContainer extends Component {
    
    render() { 
        return (
            <Row xs={1} md={2}>
                <Col>
                    { this.props.photos.map(photo => (
                        <Card >
                            <Card.Img variant="top" src={photo.src.large}/>
                        </Card>
                    ))}
                </Col>
            </Row>
        );
    }
}
 
export default PhotoContainer;