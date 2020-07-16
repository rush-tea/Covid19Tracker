import React, { Component } from "react";
import axios from "axios";
import DailyConfirmed from './charts/dailyConfirmed';
import TotalConfirmed from './charts/totalConfirmed';
import Dailydeceased from './charts/dailyDeath';
import Dailyrecovered from './charts/dailyRecovered';
import Totaldeceased from './charts/totalDeath';
import Totalrecovered from './charts/totalRecovered';

class Home extends Component {
    state= {
        posts: []
    }
    componentDidMount(){
        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            //console.log(res);
            this.setState({
                posts: res.data.statewise
            })
        })
    }
    render(){
        const { posts } = this.state;
        return(
            <section>
              <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Confirmed</th>
                  <th>Active</th>
                  <th>Recoveries</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.statecode}>
                    <td>{post.state}</td>
                    <td>{post.confirmed}</td>
                    <td>{post.active}</td>
                    <td>{post.recovered}</td>
                    <td>{post.deaths}</td>
                  </tr>
                ))}
              </tbody>
                  
              </table>    
            <div id="graphs" className="charts">
              <DailyConfirmed />
              <TotalConfirmed />
              <Dailyrecovered />
              <Totalrecovered />
              <Dailydeceased />
              <Totaldeceased />
              </div>
            </section>
        )
    }
}

export default Home