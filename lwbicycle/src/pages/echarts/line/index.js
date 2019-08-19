import React from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Line extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: 'Order'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    'Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: 'Order'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['OFO order amount', 'Mobile order amount']
            },
            xAxis: {
                data: [
                    'Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO order amount',
                    type: 'line',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: 'Mobile order amount',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: 'Order'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    'Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order amount',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="Line 1">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="Line 2" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="Line 3" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}