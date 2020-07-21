import React, { Component } from "react";
import axios from "axios";

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
                </div>
                <hr />
            </>
        )
    }
}

export default TotalStats