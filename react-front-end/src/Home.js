import React, { Component } from 'react'

class Home extends Component {
    styling = {
        alignItems: 'center',
        display: 'flex',
        height: '50vh',
        justifyContent: 'center'
    }
    render() {
        return(
            <h2 style={this.styling}>
                Home
            </h2>
        );
    }
}

export default Home;