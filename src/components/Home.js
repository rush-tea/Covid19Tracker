import React, { Component } from "react";
import StateData from './stats/stateData';
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
            </section>
          </div>
        )
    }
}

export default Home