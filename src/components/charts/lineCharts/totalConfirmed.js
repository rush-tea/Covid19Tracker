import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
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
                totalConfirmed = totalConfirmed.slice(totalConfirmed.length - 60, totalConfirmed.length);
                totalRecovered = totalRecovered.slice(totalRecovered.length - 60, totalRecovered.length);
                date = date.slice(date.length - 60, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                borderWidth: 1,
                                pointBorderWidth: 0.1,
                                borderColor: "rgb(77, 235, 164)",
                                pointBackgroundColor: "rgb(77, 235, 164)",
                                backgroundColor: "rgba(77, 235, 164,0.2)",
                                label: "Total Recovered",
                                data: totalRecovered,
                                pointRadius: 2
                            },
                            {
                                pointBorderWidth: 0.1,
                                borderColor: "rgb(96, 144, 240)",
                                pointBackgroundColor: "rgb(96, 144, 240)",
                                backgroundColor: "rgba(96, 144, 240,0.1)",
                                borderWidth: 1,
                                label: "Total Confirmed Cases",
                                data: totalConfirmed,
                                pointRadius: 2
                            }
                        ]
                    }
                });
            });
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
                        titleMarginBottom: 10,
                        titleAlign: "center",
                        bodySpacing: 4,
                        titleFontColor: "black",
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
                                maxTicksLimit: 10,
                                fontColor: "#666",
                                fontSize: 8
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                autoSkip: true,
                                display: false,
                                maxTicksLimit: 10
                            },
                            gridLines:{
                                display: false
                            },
                        }],
                    }
                }}
                    data={this.state.totalStat}
                />
        )
    }
}

export default TotalConfirmed