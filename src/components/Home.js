import React, { Component } from "react";
import StateData from './stats/stateData';
import TotalStats from "./stats/totalStats";

class Home extends Component {
    render(){
        return(
          <div>
            <TotalStats />
            <div className="middle-table">
                <StateData />
            </div>
          </div>
        )
    }
}

export default Home