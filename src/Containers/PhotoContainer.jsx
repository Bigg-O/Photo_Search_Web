import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class PhotoContainer extends Component {
    
    render() { 
        return (
            <Container>
                { this.props.onSearchMode
                    ?
                        <Container>
                            <Alert variant="success">
                                This is your search result!
                            </Alert>
                            <Button type="reset" onClick={this.props.onReset} variant="link">Back to normal search</Button>
                        </Container>
                    :
                        <div></div>
                }
                <Row xs={1} md={2} >
                        { this.props.photos.map(photo => (
                            <Card >
                                <Card.Img variant="top" src={photo.src.large}/>
                            </Card>
                        ))}
                </Row>
            </Container>
        );
    }
}
 
export default PhotoContainer;