import React, {useState} from 'react';
import {Typography, Paper, Button} from '@material-ui/core';
import {Bar, Line} from 'react-chartjs-2';
import _ from 'lodash';

function Widget5(props)
{
    const [currentRange, setCurrentRange] = useState('TW');
   // const widget = _.merge({}, props.widget);

    function handleChangeRange(range)
    {
        setCurrentRange(range);
    }

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 py-16 border-b-1">
                <Typography className="text-16">Demandes ...</Typography>
                {/*
                <div className="items-center">
                    {Object.entries(widget.ranges).map(([key, n]) => {
                        return (
                            <Button
                                key={key}
                                className="normal-case shadow-none px-16"
                                onClick={() => handleChangeRange(key)}
                                color={currentRange === key ? "secondary" : "default"}
                                variant={currentRange === key ? "contained" : "text"}
                            >
                                {n}
                            </Button>
                        )
                    })}
                </div>
            */}
            </div>
            <div className="flex flex-row flex-wrap">
                <div className="w-full md:w-1/2 p-8 min-h-420 h-420">
                    <Bar
                        data={{
                            labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                            datasets: [
                                {
                                    type                : 'bar',
                                    label               : 'Issues',
                                    data                : [42, 28, 43, 34, 20, 25, 22],
                                    backgroundColor     : '#42BFF7',
                                    hoverBackgroundColor: '#87cdf7'
                                },
                                {
                                    type                : 'bar',
                                    label               : 'Closed issues',
                                    data                : [11, 10, 8, 11, 8, 10, 17],
                                    backgroundColor     : '#c6ecfd',
                                    hoverBackgroundColor: '#d7effd'
                                }
                            ]
                        }}
                        options={{
                            responsive         : true,
                            maintainAspectRatio: false,
                            legend             : {
                                display: false
                            },
                            tooltips           : {
                                mode: 'label'
                            },
                            scales             : {
                                xAxes: [
                                    {
                                        stacked           : true,
                                        display           : true,
                                        gridLines         : {
                                            display: false
                                        },
                                        labels            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                        categoryPercentage: 1
                                    }
                                ],
                                yAxes: [
                                    {
                                        stacked  : true,
                                        type     : 'linear',
                                        display  : true,
                                        position : 'left',
                                        gridLines: {
                                            display: false
                                        },
                                        labels   : {
                                            show: true
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                </div>
                {/*<div className="flex w-full md:w-1/2 flex-wrap p-8">
                    {Object.entries(widget.supporting).map(([key, item]) => {
                        return (
                            <div key={key} className="w-full sm:w-1/2 p-12">
                                <Typography className="text-15 whitespace-no-wrap" color="textSecondary">{item.label}</Typography>
                                <Typography className="text-32">{item.count[currentRange]}</Typography>
                                <div className="h-64 w-full">
                                    <Line
                                        data={{
                                            labels  : item.chart[currentRange].labels,
                                            datasets: item.chart[currentRange].datasets
                                        }}
                                        options={item.chart.options}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            */}
            </div>
        </Paper>
    );
}

export default React.memo(Widget5);
