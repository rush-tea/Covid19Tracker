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
            return(
                <div key={post.statecode}>{post.state}
                {post.active}</div>
            ) 
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