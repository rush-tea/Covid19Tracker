import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Charts extends Component {
    state={
        dailyStat: {
            labels: ["1","2","3","4","5"],
            datasets: [
                {
                    label: "Daily Cases",
                    data: [1,2]
                }
            ]
        }
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
            .then(res => {
                const dailyConfirmed = [];
                const date = [];
                //console.log(res.data.cases_time_series);
                res.data.cases_time_series.forEach(daily => {
                    const dailyC = dailyConfirmed.push(daily.dailyconfirmed);
                    const dailydate = date.push(daily.date);
                })
                console.log(dailyConfirmed);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Daily Cases",
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
    if(data.datasets){
        data.datasets.forEach((set) => {
            set.borderColor = "red";
            set.borderWidth = 1;
        });
    }
    return data;
}

render(){
    return (
        <div style={{position: "relative", width: 1000, height: 550}}>
            <Line
             options={{
                responsive: true
            }}
            data= {this.getChartData}
            />
        </div>
        )
    }
}

export default Charts