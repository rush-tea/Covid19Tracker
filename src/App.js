import React, { Component } from 'react';
import Home from './components/Home';
import DailyConfirmed from './components/charts/dailyConfirmed';
import TotalConfirmed from './components/charts/totalConfirmed';
import Dailydeceased from './components/charts/dailyDeath';
import Dailyrecovered from './components/charts/dailyRecovered';
import Totaldeceased from './components/charts/totalDeath';
import Totalrecovered from './components/charts/totalRecovered';

class App extends Component {
    render(){
        return(
            <div>
                <Home />
                <DailyConfirmed />
                <TotalConfirmed />
                <Dailydeceased />
                <Dailyrecovered />
                <Totaldeceased />
                <Totalrecovered />
            </div>
        )
    }
}

export default App;