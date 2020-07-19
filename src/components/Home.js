import React, { Component } from "react";
import StateData from './stats/stateData';
import TotalConfirmed from './charts/lineCharts/totalConfirmed';
import Dailydeceased from './charts/lineCharts/dailyDeath';
import Totaldeceased from './charts/lineCharts/totalDeath';
import Totalrecovered from './charts/lineCharts/totalRecovered';
import TotalStats from "./stats/totalStats";

class Home extends Component {
    render(){
        return(
          <div>
            <TotalStats />
            <section>
              <div>
                <StateData />
              </div>
              <div id="graphs" className="charts">
                <div></div>
                <div><TotalConfirmed /></div>
                <div><Totalrecovered /></div>
                <div><Dailydeceased /></div>
                <div><Totaldeceased /></div>
              </div>
            </section>
          </div>
        )
    }
}

export default Home