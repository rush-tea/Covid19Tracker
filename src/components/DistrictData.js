import React, { Component } from "react";
import axios from "axios";
import DistrictDaily from './charts/stateCharts/StateTotal';


class DistrictData extends Component {
    constructor() {
        super();
        this.state = {
            'districts': [],
            names: [],
            stateName: ""
        }
    }
    componentDidMount() {
        this.getItems();
    }
    getItems() {
        var dist_id = this.props.match.params.dist_id;
        axios.get("https://api.covid19india.org/state_district_wise.json")
            .then((res) => {
                this.setState({
                    districts: res.data
                });
                Object.values(this.state.districts).forEach(district => {
                    if (district.statecode === dist_id) {
                        Object.entries(district.districtData).forEach((keys, values) => {
                            this.state.names.push(keys);
                        });
                        this.setState({
                            names: this.state.names,
                            stateName: dist_id
                        });
                    }
                });
            });
    }
    render() {

        return (
            <>
            <DistrictDaily value= {this.state.stateName} />
            <div className="stateData">
                <table id="middle-table">
                    <thead>
                        <tr>
                            <th>District</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                        </tr>
                    </thead>
                    {
                        this.state.names.map(dist => {
                            return (
                                <tbody key={dist[0]}>
                                    <tr>
                                        <td id="statename">{dist[0]}</td>
                                        <td id="confirmed"> {dist[1].confirmed} </td>
                                        <td id="active"> {dist[1].active} </td>
                                        <td id="recovered"> {dist[1].recovered} </td>
                                        <td id="deaths"> {dist[1].deceased} </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
            </div>
            <hr/>
            </>
        )
    }
}

export default DistrictData