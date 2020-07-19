import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
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
                totaldeceased = totaldeceased.slice(totaldeceased.length - 31, totaldeceased.length);
                date = date.slice(date.length - 21, date.length);
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
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 8
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 8
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