import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";


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
                </div>
                <i
                    className="fa fa-bars hamburger"
                    aria-hidden="true"
                    onClick={e => this.handleToggle(e)}
                />
                <ul className={`nav-links ${isExpanded ? "open" : ""}`}>
                    <li>home</li>
                    <li>about</li>
                    <li>contact</li>
                </ul>
            </nav>
            <hr/>
            </>
        );
    }
}

export default Nav;