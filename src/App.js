import React, { Component } from 'react';
import Home from './components/Home';
import DailyConfirmed from './components/charts/dailyConfirmed';
import TotalConfirmed from './components/charts/totalConfirmed';

class App extends Component {
    render(){
        return(
            <div>
                <Home />
                <DailyConfirmed />
                <TotalConfirmed />
            </div>
        )
    }
}

export default App;