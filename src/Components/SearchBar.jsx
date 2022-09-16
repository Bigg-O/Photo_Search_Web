import React, { Component } from "react";

import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SearchBar extends Component {
    render() { 
        return ( 
            <Container fluid>
                <Form onSubmit={this.props.onSearch}>
                    <Form.Control 
                        required
                        name="query"
                        id="query"
                        type="text"
                        placeholder="Ocean, Tigers, Pears, etc."
                        />
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}
 
export default SearchBar;