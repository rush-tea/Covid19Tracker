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
                totaldeceased = totaldeceased.slice(totaldeceased.length - 80, totaldeceased.length);
                date = date.slice(date.length - 80, date.length);
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