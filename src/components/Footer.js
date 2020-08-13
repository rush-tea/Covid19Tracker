import React, { Component } from "react";

class Footer extends Component{
    render(){
        return(
            <>
            <footer>
                <div className="code">
                        <a href="https://github.com/rush-tea/Covid19Tracker"> <div>  <i className="fa fa-code" aria-hidden="true"></i><p>Contribute to this site</p> </div></a>
                        <a href="https://api.covid19india.org/"> <div><i className="fa fa-database" aria-hidden="true"></i><p>API</p></div> </a>        
                </div>
                <div className="salutation">
                    <p>Stay Home, Stay Safe</p>
                </div>
                <div className="contact">
                        <div> <a href="https://github.com/rush-tea"><i className="fa fa-github" aria-hidden="true"></i></a></div>
                        <div> <a href="https://www.linkedin.com/in/adarsh-tripathi-0a5a24191/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
                        <div> <a href="https://www.instagram.com/adarsh._.tripathi._/">  <i className="fa fa-instagram" aria-hidden="true"></i> </a> </div>
                        <div> <a href="https://www.facebook.com/adarsh.tripathi.5855594/"> <i className="fa fa-facebook" aria-hidden="true"></i></a></div>
                </div>
            </footer>
            </>
        )
    }
}
export default Footer