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
          <div>
            <div id="top-content">
              <table id="top-table">
                <thead>
                  <tr>
                    <th id="c">Confirmed</th>
                    <th id="a">Active</th>
                    <th id="r">Recoveries</th>
                    <th id="d">Deaths</th>
                  </tr>
                </thead>
                {posts.map(post => {
                  if (post.statecode === "TT")
                    return (
                      <tbody key={post.statecode}>
                        <tr>
                          <td id="c">{post.confirmed}</td>
                          <td id="a">{post.active}</td>
                          <td id="r">{post.recovered}</td>
                          <td id="d">{post.deaths}</td>
                        </tr>
                      </tbody>
                    )
                })}
              </table>
            </div>
            
            <section>
              <div>
                <table id="middle-table">
                  <tbody>
                    {posts.map(post => {
                      if (post.statecode !== "TT")
                        return (
                          <tr key={post.statecode}>
                            <td id="statedata">{post.state}</td>
                            <td id="confirmed">{post.confirmed}</td>
                            <td id="active">{post.active}</td>
                            <td id="recovered">{post.recovered}</td>
                            <td id="deaths">{post.deaths}</td>
                          </tr>
                        )
                    }
                    )}
                  </tbody>
                </table>
              </div>
              <div id="graphs" className="charts">
                <DailyConfirmed />
                <TotalConfirmed />
                <Dailyrecovered />
                <Totalrecovered />
                <Dailydeceased />
                <Totaldeceased />
              </div>
            </section>
          </div>
            
              
            
        )
    }
}

export default Home