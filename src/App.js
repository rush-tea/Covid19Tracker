import React, { Component } from 'react';
import Home from './components/Home'
import DailyCOnfirmed from './components/charts/dailyConfirmed'

class App extends Component {
    render(){
        return(
            <div>
                <Home />
                <DailyCOnfirmed />
            </div>
        )
    }
}

export default App;