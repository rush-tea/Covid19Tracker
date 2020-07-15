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
                    const totalC = totaldeceased.push(total.totaldeceased);
                    const totaldate = date.push(total.date);
                });
                totaldeceased = totaldeceased.slice(totaldeceased.length - 31, totaldeceased.length);
                date = date.slice(date.length - 31, date.length);
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
                })
                console.log(this.state);
            })
    }

    getChartData = canvas => {
        const data = this.state.totalStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgb(54, 235, 60)";
                set.pointBackgroundColor = "green";
                set.pointBorderColor = "green";
                set.borderColor = "rgb(54, 235, 60)";
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

export default Totaldeceased