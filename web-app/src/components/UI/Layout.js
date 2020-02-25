import React, { Component } from 'react'
import { Container, Box } from '@material-ui/core'
import NavBar from "./NavBar"
export class Layout extends Component {

    
    render() {
        return (
            <Box bgcolor="primary.light" style={{width:"100%",height:"100%",position:"fixed"}}>
                <NavBar/>
                <Container>
                    {this.props.children}
                </Container>
            </Box>
        )
    }
}

export default Layout
