import React, { Component } from "react";
import axios from "axios";
import DistrictDaily from './charts/stateCharts/StateTotal';
import NumberFormat from 'react-number-format';


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
                                        <td id="confirmed">
                                            <div>
                                                <span><NumberFormat value={dist[1].confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    dist[1].delta.confirmed > 0 && <span>+<NumberFormat value={dist[1].delta.confirmed} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>    
                                        <td id="active"><NumberFormat value={dist[1].active} displayType={'text'} thousandSeparator={true} /> </td>
                                        <td id="recovered">
                                            <div>
                                                <span><NumberFormat value={dist[1].recovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    dist[1].delta.recovered > 0 && <span>+<NumberFormat value={dist[1].delta.recovered} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>
                                        <td id="deaths">
                                            <div>
                                                <span><NumberFormat value={dist[1].deceased} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                {
                                                    dist[1].delta.deceased > 0 && <span>+<NumberFormat value={dist[1].delta.deceased} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /></span>
                                                }
                                            </div>
                                        </td>
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