import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
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
                var dailyRecoveries =[];
                var date = [];
                res.data.cases_time_series.forEach(daily => {
                    dailyConfirmed.push(daily.dailyconfirmed);
                    dailyRecoveries.push(daily.dailyrecovered);
                    date.push(daily.date);
                });
                dailyConfirmed = dailyConfirmed.slice(dailyConfirmed.length - 50, dailyConfirmed.length);
                dailyRecoveries = dailyRecoveries.slice(dailyRecoveries.length - 50, dailyRecoveries.length);
                date = date.slice(date.length - 50, date.length);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                backgroundColor: "rgb(98, 174, 245)",
                                borderColor: "rgb(98, 174, 245)",
                                borderWidth : 1,
                                pointRadius : 1,
                                label: "Daily Confirmed Cases",
                                data: dailyConfirmed
                            },
                            {
                                backgroundColor: "rgb(98, 245, 203)",
                                borderColor: "rgb(98, 245, 203)",
                                borderWidth: 1,
                                pointRadius: 1,
                                label: "Daily Recoveries",
                                data: dailyRecoveries
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
                    tooltips: {
                        enabled: true,
                        xPadding: 10,
                        yPadding: 10,
                        footerMarginTop: 10,
                        titleFontColor: "#f0f0f0",
                        titleMarginBottom: 10,
                        titleAlign: "center",
                        bodySpacing: 4,
                        bodyFontColor: "black",
                        backgroundColor: "rgba(250, 250, 250,0.9)",
                        titleFontFamily: "font-family: 'Poppins', sans-serif"
                    },
                    devicePixelRatio: 3,
                    responsive: true,
                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            fontColor: "black",
                            fontFamily: " 'Poppins', sans-serif",
                            usePointStyle: true,
                            pointRadius: 10
                        }
                    },
                    scales: {
                        yAxes: [{
                            position: "right",
                            stacked: true,
                            ticks: {
                                display: true,
                                maxTicksLimit: 8,
                                fontColor: "#666",
                                fontSize: 8
                            },
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                autoSkip: true,
                                display: false,
                                maxTicksLimit: 4
                            }
                        }],
                    }
                }}
                data={this.state.dailyStat}
            />
        )
    }
}

export default DailyConfirmed