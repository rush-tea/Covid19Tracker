import React, { Component } from "react";
import axios from "axios";


class DistrictData extends Component {
    constructor() {
        super();
        this.state = {
            'districts': [],
            names: []
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
                            names: this.state.names
                        })
                    }
                });
            });
    }
    render() {

        return (
            <div>
                <table id="dist-middle-table">
                    <thead>
                        <tr>
                            <th>State</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                        </tr>
                    </thead>
                    {
                        this.state.names.map(dist => {
                            return (
                                <tbody key={dist[0]}>
                                    <tr>
                                        <td>{dist[0]}</td>
                                        <td> {dist[1].confirmed} </td>
                                        <td> {dist[1].active} </td>
                                        <td> {dist[1].deceased} </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
            </div>
        )
    }
}

export default DistrictData