import React, { Component } from "react";
import { Link } from "react-router-dom";


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };
    }
    handleToggle(e) {
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }
    render() {
        const { isExpanded } = this.state;

        return (
            <>
            <nav>
                <div className="logo-name">
                    <p>Covid19Outbreak</p>
                    <span>Stats overview</span>
                </div>
                <i
                    className={` fa fa-bars hamburger ${isExpanded ? "clicked" : ""}`}
                    aria-hidden="true"
                    onClick={e => this.handleToggle(e)}
                />
                <ul className={`nav-links ${isExpanded ? "open" : ""}`}>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="https://india19covid.netlify.app">Home</a> </li>
                        <li className={`${isExpanded ? "fade" : ""}`}><a href="https://www.covid19india.org/">Deep Dive</a></li>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"> WHO Guidelines </a></li>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="https://api.covid19india.org/">API</a></li>
                        <div className={`contact-nav`}>
                            <div> <a href="https://github.com/rush-tea"><i className="fa fa-github" aria-hidden="true"></i></a></div>
                            <div> <a href="https://www.linkedin.com/in/adarsh-tripathi-0a5a24191/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
                            <div> <a href="https://www.instagram.com/adarsh._.tripathi._/">  <i className="fa fa-instagram" aria-hidden="true"></i> </a> </div>
                            <div> <a href="https://www.facebook.com/adarsh.tripathi.5855594/"> <i className="fa fa-facebook" aria-hidden="true"></i></a></div>
                        </div>
                        <hr className="nav-hr" />
                        <div className="nav-sal">
                            <p>Stay Home, Stay Safe</p>
                        </div>
                </ul>
            </nav>
            <hr/>
            </>
        );
    }
}

export default Nav;