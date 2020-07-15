import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    state= {
        posts: []
    }
    componentDidMount(){
        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            console.log(res);
            this.setState({
                posts: res.data.statewise
            })
        })
    }
    render(){
        const { posts } = this.state;
        const postList = posts.length ? (
          posts.map((post) => {
            return (
              <div>
                <tr>
                  <th>State</th>
                  <th>Confirmed</th>
                  <th>Active</th>
                  <th>Recoveries</th>
                  <th>Deaths</th>
                </tr>
                <tr>
                  <td>{post.state}</td>
                  <td>{post.confirmed}</td>
                  <td>{post.active}</td>
                  <td>{post.recovered}</td>
                  <td>{post.deaths}</td>
                </tr>
              </div>
            ); 
          })
        ) : (
          <div>No data found</div>
        );
        return(
            <div>
                {postList}
            </div>
        )
    }
}

export default Home