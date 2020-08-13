import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

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
            <div className="stateData">
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
                                        <td id="statename"><Link to={"/" + post.statecode}>{post.state}</Link></td>
                                        <td id="confirmed"><NumberFormat value={post.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></td>
                                        <td id="active"><NumberFormat value={post.active} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></td>
                                        <td id="recovered"><NumberFormat value={post.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></td>
                                        <td id="deaths"><NumberFormat value={post.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"/></td>
                                    </tr>
                                )
                        }
                        )}
                    </tbody>
                </table> 
            </div>
        )
    }   
}

export default StateData 