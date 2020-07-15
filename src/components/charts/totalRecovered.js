import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Totalrecovered extends Component {
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
                var totalrecovered = [];
                var date = [];
                res.data.cases_time_series.forEach(total => {
                    const totalC = totalrecovered.push(total.totalrecovered);
                    const totaldate = date.push(total.date);
                });
                totalrecovered = totalrecovered.slice(totalrecovered.length - 31, totalrecovered.length);
                date = date.slice(date.length - 31, date.length);
                this.setState({
                    totalStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Total recovered Cases",
                                data: totalrecovered
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

export default Totalrecovered