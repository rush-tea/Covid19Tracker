import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Dailydeceased extends Component {
    state = {
        dailyStat: {
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
                var dailydeceased = [];
                var date = [];
                res.data.cases_time_series.forEach(daily => {
                    dailydeceased.push(daily.dailydeceased);
                    date.push(daily.date);
                });
                dailydeceased = dailydeceased.slice(dailydeceased.length - 31, dailydeceased.length);
                date = date.slice(date.length - 21, date.length);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Daily deceased Cases",
                                data: dailydeceased
                            }
                        ]
                    }
                });
            });
    }

    getChartData = canvas => {
        const data = this.state.dailyStat;
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
            <div style={{ position: "relative", width: 500, height: 400 }}>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    stepSize: 100
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
            </div>
        )
    }
}

export default Dailydeceased