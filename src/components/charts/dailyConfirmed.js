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
                    const dailyC = dailyConfirmed.push(daily.dailyconfirmed);
                    const dailydate = date.push(daily.date);
                });
                dailyConfirmed = dailyConfirmed.slice(dailyConfirmed.length - 31, dailyConfirmed.length);
                date = date.slice(date.length - 31, date.length);
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
                })
                console.log(this.state);
            })
    }

    getChartData = canvas => {
        const data = this.state.dailyStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgba(252, 88, 116,0.4)";
                set.pointBackgroundColor = "red";
                set.pointBorderColor = "red";
                set.borderColor = "rgba(252, 88, 116,0.4)";
                set.borderWidth = 2;
                set.pointBorderWidth = 1
            });
        }
        return data;
    }

    render() {
        return (
            <div style={{ position: "relative", width: 700, height: 550 }}>
                <Line
                    options={{
                        responsive: true
                    }}
                    data={this.getChartData}
                />
            </div>
        )
    }
}

export default DailyConfirmed