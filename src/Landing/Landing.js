import React, { Component } from 'react';

class Landing extends Component {
    componentDidMount() {
        fetch('http://localhost:4000/76561198018232960')
        .then(response => response.json())
        .then(data => {
            console.log(data.response)
        })
        .catch(err => console.log(err))
        
    }
    render() {
        return (
            <div>
                <h1> hed;laskjflksadjf</h1>
                
            </div>
        );
    }
}

export default Landing;