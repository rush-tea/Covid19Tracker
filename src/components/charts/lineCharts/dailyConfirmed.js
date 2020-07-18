import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class DailyConfirmed extends Component {
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
                var dailyConfirmed = [];
                var date = [];
                res.data.cases_time_series.forEach(daily => {
                    dailyConfirmed.push(daily.dailyconfirmed);
                    date.push(daily.date);
                });
                dailyConfirmed = dailyConfirmed.slice(dailyConfirmed.length - 31, dailyConfirmed.length);
                date = date.slice(date.length - 21, date.length);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Daily Confirmed Cases",
                                data: dailyConfirmed
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
                set.backgroundColor = "rgba(4, 222, 146,0.7)";
                set.pointBackgroundColor = "green";
                set.pointBorderColor = "green";
                set.borderColor = "rgba(4, 222, 146,0.7)";
                set.borderWidth = 2;
                set.pointBorderWidth = 1
            });
        }
        return data;
    }

    render() {
        return (
            <div style={{ position: "relative", width: 500, height: 0 }}>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    stepSize: 10000
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

export default DailyConfirmed