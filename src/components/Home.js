import React, { Component } from "react";
import StateData from './stats/stateData';
import TotalStats from "./stats/totalStats";
import Charts from "./charts/lineCharts/charts";

class Home extends Component {
    render(){
        return(
          <>
            <TotalStats />
            <StateData />
            <Charts />
          </>
        )
    }
}

export default Home