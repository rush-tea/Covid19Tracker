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
                        <li className={`${isExpanded ? "fade" : ""}`}> <Link to="/">Home</Link> </li>
                        <li className={`${isExpanded ? "fade" : ""}`}><a href="https://www.covid19india.org/">Deep Dive</a></li>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"> WHO Guidelines </a></li>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="https://github.com/covid19india/api">View Database</a></li>
                        <li className={`${isExpanded ? "fade" : ""}`}> <a href="#contacts">About Me</a> </li>
                </ul>
            </nav>
            <hr/>
            </>
        );
    }
}

export default Nav;