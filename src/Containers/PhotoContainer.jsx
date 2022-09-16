import React, { Component } from "react";
import Row from 'react-bootstrap/Row';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const PER_PAGE = 10

class PhotoContainer extends Component {
    render() {
        return (
            <Container fluid>
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
                    { this.props.isLoading
                        ?
                            // These are placeholders while photos are being fetched.
                            Array.from({ length: PER_PAGE }).map((_, idx) => (
                                <Card style={{width: "18rem"}}>
                                    <Card.Body>
                                        <Card.Title>Place Holder</Card.Title>
                                        <Card.Text>
                                            Loading.....
                                            Loading......
                                            Loading......
                                            Loading......
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        :
                            this.props.photos.map(photo => (
                                <Card style={{width: "18rem"}}>
                                    <Card.Body>
                                        <Card.Img variant="top" src={photo.src.large}/>
                                        <Card.Title>Photographer: </Card.Title>
                                        <a href={photo.photographer_url}>{photo.photographer}</a>
                                    </Card.Body>
                                </Card>
                            ))
                    }
                </Row>
            </Container>
        )
    }
}
 
export default PhotoContainer;