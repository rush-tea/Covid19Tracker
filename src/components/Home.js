import React, { Component } from "react";
import axios from "axios";
import DailyConfirmed from './charts/dailyConfirmed';
import TotalConfirmed from './charts/totalConfirmed';
import Dailydeceased from './charts/dailyDeath';
import Dailyrecovered from './charts/dailyRecovered';
import Totaldeceased from './charts/totalDeath';
import Totalrecovered from './charts/totalRecovered';
import PieTotal from './charts/pieTotal';

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
                {posts.map(post => {
                  if (post.statecode === "TT")
                    return (
                      <tbody key={post.statecode}>
                        <tr>
                          <td id="c">
                            <h2>{post.confirmed}</h2>
                            <p>Confirmed</p>
                          </td>
                          <td id="a">
                            <h2>{post.active}</h2>
                            <p>Active</p>
                          </td>
                          <td id="r">
                            <h2>{post.recovered}</h2>
                            <p>Recovered</p>
                          </td>
                          <td id="d">
                            <h2>{post.deaths}</h2>
                            <p>Deaths</p>
                          </td>
                        </tr>
                      </tbody>
                    )
                })}
              </table>
              <div id="pieChart">
                <PieTotal />
                <span> India Overview </span>
              </div>
            </div>
            
            <section>
              <div>
                <table id="middle-table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Confirmed</th>
                      <th>Active</th>
                      <th>Recovered</th>
                      <th>Deaths</th>
                    </tr>
                  </thead>
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