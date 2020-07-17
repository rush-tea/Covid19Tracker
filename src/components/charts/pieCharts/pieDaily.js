import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class PieDaily extends Component {
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
                        labels: ["Cases Today", "Recovered Today", "Deaths Today"],
                        datasets: [
                            {
                                label: [],
                                backgroundColor: ['rgb(84, 255, 158)', 'rgb(79, 176, 255)', '252, 98, 132'],
                                data: [parseInt(dataSet.deltaconfirmed), parseInt(dataSet.deltarecovered), parseInt(dataSet.deltadeaths)]
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
            <div style={{ position: "relative" }}>
                <Doughnut
                    options={this.state.options}
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default PieDaily