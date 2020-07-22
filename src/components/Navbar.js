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
                    <p>Covid19India</p>
                    <span>Stats overview</span>
                </div>
                <i
                    className={` fa fa-bars hamburger ${isExpanded ? "clicked" : ""}`}
                    aria-hidden="true"
                    onClick={e => this.handleToggle(e)}
                />
                <ul className={`nav-links ${isExpanded ? "open" : ""}`}>
                        <li> <Link to="/">Home</Link> </li>
                        <li><a href="https://www.covid19india.org/">Deep Dive</a></li>
                        <li> <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"> WHO Guidelines </a></li>
                        <li> <a href="https://github.com/covid19india/api">View Database</a></li>
                        <li> <a href="#contacts">Contact Us</a> </li>
                </ul>
            </nav>
            <hr/>
            </>
        );
    }
}

export default Nav;