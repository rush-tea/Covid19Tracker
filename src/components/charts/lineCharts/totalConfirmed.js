import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class TotalConfirmed extends Component {
    state = {
        totalStat: {
            labels: [],
            datasets: [
                {
                    label: "",
                    data: []
                }
            ]
        }
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
            .then(res => {
                var totalConfirmed = [];
                var totalRecovered = [];
                var date = [];
                res.data.cases_time_series.forEach(total => {
                    totalConfirmed.push(total.totalconfirmed);
                    totalRecovered.push(total.totalrecovered);
                    date.push(total.date);
                });
                totalConfirmed = totalConfirmed.slice(totalConfirmed.length - 30, totalConfirmed.length);
                totalRecovered = totalRecovered.slice(totalRecovered.length - 30, totalRecovered.length);
                date = date.slice(date.length - 30, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                borderWidth: 0.5,
                                borderColor: "rgb(255, 28, 89)",
                                backgroundColor: "rgba(255, 28, 89,0.8)",
                                label: "Total Confirmed Cases",
                                data: totalConfirmed
                            },
                            {
                                borderWidth: 2,
                                borderColor: "rgb(28, 255, 39)",
                                backgroundColor: "rgb(28, 255, 39,0.6)",
                                label: "Total Recovered",
                                data: totalRecovered
                            }
                        ]
                    }
                });
            });
    }

    render() {
        return (
                <Bar
                    options={{
                        legend: {
                            position: "bottom"
                        },
                        devicePixelRatio: 3,
                        responsive: true,
                        scales: {
                            yAxes: [{
                                position: 'right',
                                ticks: {
                                    display: false,
                                    autoSkip: true,
                                    maxTicksLimit: 8
                                },
                                stacked: true,
                                gridLines: {
                                    display: false
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    display: false,
                                    autoSkip: true,
                                    maxTicksLimit: 8
                                },
                                stacked: true,
                                gridLines: {
                                    display: false
                                }
                            }]
                        }
                    }}
                    data={this.state.totalStat}
                />
        )
    }
}

export default TotalConfirmed