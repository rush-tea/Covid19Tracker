import React, { Component } from "react";
import axios from "axios";
import DailyConfirmed from '../charts/lineCharts/dailyConfirmed';
import DailyRecovered from "../charts/lineCharts/dailyRecovered";
import TotalConfirmed from '../charts/lineCharts/totalConfirmed';
import Totaldeceased from '../charts/lineCharts/totalDeath';

class TotalStats extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
            .then(res => {
                this.setState({
                    posts: res.data.statewise
                });
            });
    }
    render() {
        const { posts } = this.state;
        return (
            <div id="top-content">
                {posts.map(post => {
                    if (post.statecode === "TT")
                        return (
                            <table id="top-table" key="1">
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
                                            <p style={{ color: "red" }}>+{post.deltaconfirmed}</p>
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
                <div id="daily-chart">
                    <div id="bar-top">
                        <div><span>Total Cases in India</span><TotalConfirmed /></div>
                        <div><span>Total Cases in India</span><Totaldeceased /></div>
                    </div>
                    <div id="line-top">
                        <div id="chart-top">
                            <span>Daily Cases in India</span>
                            <DailyConfirmed />
                        </div>
                        <div id="chart-top">
                            <span>Daily Recoveries in India</span>
                            <DailyRecovered />
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

export default TotalStats