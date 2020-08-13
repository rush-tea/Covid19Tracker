import React, { Component } from "react";
import axios from "axios";
import NumberFormat from 'react-number-format';
import CountUp from 'react-countup';

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
            <>
                <div className="totalData">
                    <div className="State">India Overview</div>
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
                                                <h2>
                                                    <NumberFormat value={post.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                </h2>
                                                <p style={{ color: "red" }}>+<NumberFormat value={post.deltaconfirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></p>
                                            </td>
                                            <td id="a">
                                                <h2><NumberFormat value={post.active} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></h2>
                                            </td>
                                            <td id="r">
                                                <h2><NumberFormat value={post.recovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></h2>
                                                <p style={{ color: "red" }}>+<NumberFormat value={post.deltarecovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></p>
                                            </td>
                                            <td id="d">
                                                <h2><NumberFormat value={post.deaths} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></h2>
                                                <p style={{ color: "red" }}>+<NumberFormat value={post.deltadeaths} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                    })}
                </div>
                <hr />
            </>
        )
    }
}

export default TotalStats