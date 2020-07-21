import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class DailyDeaths extends Component {
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
                var dailyDeaths= [];
                var date = [];
                res.data.cases_time_series.forEach(daily => {
                    dailyDeaths.push(daily.dailydeceased);
                    date.push(daily.date);
                });
                dailyDeaths = dailyDeaths.slice(dailyDeaths.length - 80, dailyDeaths.length);
                date = date.slice(date.length - 80, date.length);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Deaths",
                                data: dailyDeaths
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
                set.backgroundColor = "rgba(84, 184, 255,0.1)";
                set.pointBackgroundColor = "rgb(84, 184, 255)";
                set.pointBorderColor = "rgb(84, 127, 255)";
                set.borderColor = "rgba(84, 127, 255)";
                set.borderWidth = 1;
                set.pointBorderWidth = 0.1;
                set.pointRadius = 1.5;
            });
        }
        return data;
    }

    render() {
        return (
            <Line
                options={{
                    tooltips: {
                        enabled: true,
                        xPadding: 10,
                        yPadding: 10,
                        footerMarginTop: 10,
                        titleFontColor: "black",
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
                            position: 'right',
                            ticks: {
                                beginAtZero: false,
                                display: true,
                                autoSkip: true,
                                maxTicksLimit: 10,
                                fontColor: "#666",
                                fontSize: 8
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                display: false,
                                autoSkip: true,
                                maxTicksLimit: 8
                            },
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

export default DailyDeaths