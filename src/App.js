import React, { Component } from 'react';
import Home from './components/Home'
import Charts from './components/Charts'

class App extends Component {
    render(){
        return(
            <div>
                <Home />
                <Charts />
            </div>
        )
    }
}

export default App;