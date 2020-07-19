import React, { Component } from "react";
import axios from "axios";
import StateData from './stats/stateData';
import TotalConfirmed from './charts/lineCharts/totalConfirmed';
import Dailydeceased from './charts/lineCharts/dailyDeath';
import Dailyrecovered from './charts/lineCharts/dailyRecovered';
import Totaldeceased from './charts/lineCharts/totalDeath';
import Totalrecovered from './charts/lineCharts/totalRecovered';
import {Link} from 'react-router-dom';
import TotalStats from "./stats/totalStats";

class Home extends Component {
    state= {
        posts: []
    }
    componentDidMount(){
        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            this.setState({
                posts: res.data.statewise
            });
        });
    }
    
    render(){
        const { posts } = this.state;
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
                <div><Dailyrecovered /></div>
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