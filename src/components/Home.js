import React, { Component } from "react";
import axios from "axios";
import DailyConfirmed from './charts/lineCharts/dailyConfirmed';
import TotalConfirmed from './charts/lineCharts/totalConfirmed';
import Dailydeceased from './charts/lineCharts/dailyDeath';
import Dailyrecovered from './charts/lineCharts/dailyRecovered';
import Totaldeceased from './charts/lineCharts/totalDeath';
import Totalrecovered from './charts/lineCharts/totalRecovered';
import PieTotal from './charts/pieCharts/pieTotal';
import PieDaily from './charts/pieCharts/pieDaily';

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
            });
        });
    }
    render(){
        const { posts } = this.state;
        return(
          <div className="container">
            <div id="top-content">
                {posts.map(post => {
                  if (post.statecode === "TT")
                    return (
                      <table id="top-table">
                      <thead>
                        <tr>
                          <th id="c"><p>Confirmed</p></th>
                          <th id="a"><p>Active</p></th>
                          <th id="r"><p>Recovered</p></th>
                          <th id="d"><p>Deaths</p></th>
                        </tr>
                      </thead>
                      <tbody key={post.statecode}>
                        <tr>
                          <td id="c">                            
                            <h2>{post.confirmed}</h2>
                            <p style={{color: "red"}}>+{post.deltaconfirmed}</p>                            
                          </td>
                          <td id="a">                            
                            <h2>{post.active}</h2>
                          </td>
                          <td id="r">                            
                            <h2>{post.recovered}</h2>
                            <p style={{ color: "red" }}>+{post.deltarecovered}</p>                            
                          </td>
                          <td id="d">                    
                            <h2>{post.deaths}</h2>
                            <p style={{ color: "red" }}>+{post.deltadeaths}</p>                            
                          </td>
                        </tr>
                      </tbody>
                      </table>
                    )
                })}
              <div id="pieChart">
                <PieTotal />
                <span> India Overview </span>
                <PieDaily />
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