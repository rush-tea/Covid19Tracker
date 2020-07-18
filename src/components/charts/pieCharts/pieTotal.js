import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
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
                const dataSet = res.data.statewise[0];
                this.setState({
                    data: {
                        labels: ["Active", "Recovered","Deaths"],
                        datasets: [
                            {
                                label: [],
                                backgroundColor: ['rgb(36, 37, 128)','rgb(66, 135, 245)','red'],
                                data: [parseInt(dataSet.active), parseInt(dataSet.recovered), parseInt(dataSet.deaths) ] 
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                            label: {
                                fontSize: 0
                            }
                        },
                        title: {
                            display: false
                        },
                        cutoutPercentage: 75
                    }
                });
            });
    }
    render() {
        return (
            <div style={{ position: "relative"}}>
                <Doughnut
                    options={this.state.options}
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default PieTotal