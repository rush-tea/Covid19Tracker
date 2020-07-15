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
                    const totalC = totalConfirmed.push(total.totalconfirmed);
                    const totaldate = date.push(total.date);
                });
                totalConfirmed = totalConfirmed.slice(totalConfirmed.length - 31, totalConfirmed.length);
                date = date.slice(date.length - 31, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Confirmed Cases",
                                data: totalConfirmed
                            }
                        ]
                    }
                })
                console.log(this.state);
            })
    }

    getChartData = canvas => {
        const data = this.state.totalStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgba(235, 54, 54,0.4)";
                set.pointBackgroundColor = "red";
                set.pointBorderColor = "red";
                set.borderColor = "rgba(235, 54, 54,0.4)";
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

export default TotalConfirmed