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
                                        <td id="confirmed">
                                            <div>
                                                <span><NumberFormat value={post.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    post.deltaconfirmed > 0 && <span>+<NumberFormat value={post.deltaconfirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>
                                        <td id="active">
                                            <NumberFormat value={post.active} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                        </td>
                                        <td id="recovered">
                                            <div>
                                                <span><NumberFormat value={post.recovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    post.deltarecovered > 0 && <span>+<NumberFormat value={post.deltarecovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>
                                        <td id="deaths">
                                            <div>
                                                <span><NumberFormat value={post.deaths} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    post.deltadeaths > 0 && <span>+<NumberFormat value={post.deltadeaths} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>
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