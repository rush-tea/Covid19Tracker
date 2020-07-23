import React, { Component } from "react";
import DailyConfirmed from './dailyConfirmed';
import DailyDeaths from "./dailyDeaths";
import TotalConfirmed from './totalConfirmed';
import Totaldeceased from './totalDeath';

class Charts extends Component {
    render() {
        return (
            <>
            <hr/>
                <div id="chart">
                    <div className="bar-chart">
                        <div><span>Total Cases in India</span><TotalConfirmed /></div>
                        <div><span>Total Deaths in India</span><Totaldeceased /></div>
                    </div>
                    <div className="line-chart">
                        <div>
                            <span>Daily Cases in India</span>
                            <DailyConfirmed />
                        </div>
                        <div>
                            <span>Daily Deaths in India</span>
                            <DailyDeaths />
                        </div>
                    </div>
                </div>
                <hr/>
            </>
        )
    }
}


export default Charts
