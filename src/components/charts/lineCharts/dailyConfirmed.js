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
                date = date.slice(date.length - 30, date.length);
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
                set.backgroundColor = "rgba(252, 208, 207,0.4)"
                set.pointBorderColor = "";
                set.borderColor = "rgb(252, 90, 78)";
                set.borderWidth = 5;
                set.pointRadius = 0;
                set.hoverBackgroundColor = "white";
            });
        }
        return data;
    }

    render() {
        return (
            <Line
                options={{
                    layout:{
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } 
                    },
                    devicePixelRatio: 2,
                    legend: {
                        display: false
                    },
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: false,
                                maxTicksLimit: 8
                            },
                            gridLines: {
                                display: false,
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                display: false,
                                maxTicksLimit: 8
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                    }
                }}
                data={this.getChartData}
            />
        )
    }
}

export default DailyConfirmed