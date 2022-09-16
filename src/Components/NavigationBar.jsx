import { Component } from "react";

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"

class NavigationBar extends Component {
    render() { 
        return ( 
            <Navbar bg="light">
                <Container fluid>
                    <Navbar.Brand>Photo Search Web</Navbar.Brand>
                    <Nav>
                        Dev:
                        <a href="https://www.wookeun.com">Wookeun Song</a>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
 
export default NavigationBar;