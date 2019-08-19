import React from 'react'
import { Card } from 'antd'
import echartTheme from './../themeLight'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends React.Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: 'Order',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: 'Order amount',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: 'Mondy'
                        },
                        {
                            value: 1000,
                            name: 'Tuesday'
                        },
                        {
                            value: 2000,
                            name: 'Wendnesday'
                        },
                        {
                            value: 1500,
                            name: 'Thursday'
                        },
                        {
                            value: 3000,
                            name: 'Friday'
                        },
                        {
                            value: 2000,
                            name: 'Saturday'
                        },
                        {
                            value: 1200,
                            name: 'Sunday'
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: 'Order',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: 'Order amount',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 1000,
                            name: 'Mondy'
                        },
                        {
                            value: 1000,
                            name: 'Tuesday'
                        },
                        {
                            value: 2000,
                            name: 'Wendnesday'
                        },
                        {
                            value: 1500,
                            name: 'Thursday'
                        },
                        {
                            value: 3000,
                            name: 'Friday'
                        },
                        {
                            value: 2000,
                            name: 'Saturday'
                        },
                        {
                            value: 1200,
                            name: 'Sunday'
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: 'Order',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mondy', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: 'Order amount',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: 'Mondy'
                        },
                        {
                            value: 1000,
                            name: 'Tuesday'
                        },
                        {
                            value: 2000,
                            name: 'Wendnesday'
                        },
                        {
                            value: 1500,
                            name: 'Thursday'
                        },
                        {
                            value: 3000,
                            name: 'Friday'
                        },
                        {
                            value: 2000,
                            name: 'Saturday'
                        },
                        {
                            value: 1200,
                            name: 'Sunday'
                        }
                    ].sort((a, b) => {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="Pie 1">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="Pie 2" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="Pie 3" style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}