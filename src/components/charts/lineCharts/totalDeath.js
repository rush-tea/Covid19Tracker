import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class Totaldeceased extends Component {
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
                var totaldeceased = [];
                var date = [];
                res.data.cases_time_series.forEach(total => {
                    totaldeceased.push(total.totaldeceased);
                    date.push(total.date);
                });
                totaldeceased = totaldeceased.slice(totaldeceased.length - 40, totaldeceased.length);
                date = date.slice(date.length - 40, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Total deceased Cases",
                                data: totaldeceased
                            }
                        ]
                    }
                });
            });
    }

    getChartData = canvas => {
        const data = this.state.totalStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgba(252, 88, 116,0.7)";
                set.pointBackgroundColor = "red";
                set.pointBorderColor = "red";
                set.borderColor = "rgba(252, 88, 116,0.7)";
                set.borderWidth = 2;
                set.pointBorderWidth = 1
            });
        }
        return data;
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
                    data={this.getChartData}
                />
        )
    }
}

export default Totaldeceased