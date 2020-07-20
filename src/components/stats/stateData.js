import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class StateData extends Component {
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
        return(
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
                                    <td id="statedata"><Link to={"/" + post.statecode} >{post.state}</Link></td>
                                    <td id="confirmed" >{post.confirmed}</td>
                                    <td id="active">{post.active}</td>
                                    <td id="recovered">{post.recovered}</td>
                                    <td id="deaths">{post.deaths}</td>
                                </tr>
                            )
                    }
                    )}
                </tbody>
            </table>
        )
    }   
}

export default StateData 