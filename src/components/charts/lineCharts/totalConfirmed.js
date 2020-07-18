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
                var date = [];
                res.data.cases_time_series.forEach(total => {
                    totalConfirmed.push(total.totalconfirmed);
                    date.push(total.date);
                });
                totalConfirmed = totalConfirmed.slice(totalConfirmed.length - 31, totalConfirmed.length);
                date = date.slice(date.length - 31, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Total Confirmed Cases",
                                data: totalConfirmed
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
            <div style={{ position: "relative", width: 500, height: 400 }}>
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
            </div>
        )
    }
}

export default TotalConfirmed