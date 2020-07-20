import React, { Component } from "react";


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand">Covid19India</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <span className="nav-link">Home <span className="sr-only">(current)</span></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Link</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar