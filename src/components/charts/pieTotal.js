import React, { Component } from "react";
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

class PieTotal extends Component {
    state = {
        data: {
            labels: [],
            datasets: [
                {
                    label: "Points",
                    backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
                    data: []
                }
            ]
        }
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
            .then(res => {
                console.log(res.data);
                const dataSet = res.data.statewise[0];
                console.log(dataSet);
                this.setState({
                    data: {
                        labels: [],
                        datasets: [
                            {
                                label: "Points",
                                backgroundColor: ['rgb(25, 250, 29)', 'rgb(36, 37, 128)','rgb(66, 135, 245)','red'],
                                data: [parseInt(dataSet.confirmed),parseInt(dataSet.active), parseInt(dataSet.recovered), parseInt(dataSet.deaths) ] 
                            }
                        ]
                    }
                });
            });
    }
    render() {
        return (
            <div style={{ position: "relative"}}>
                <Pie
                    options={{
                        responsive: true
                    }}
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default PieTotal