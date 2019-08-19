import React from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils';
export default class BasicTable extends React.Component {

    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log("::" + sorter)
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure to delete this data?',
            onOk: () => {
                message.success('Delete succeed');
                this.request();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: 'User name',
                key: 'userName',
                width: 80,
                dataIndex: 'userName'
            },
            {
                title: 'Sex',
                key: 'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Just graduated',
                        '2': 'Employed',
                        '3': 'Master',
                        '4': 'Frontend Developer',
                        '5': 'Entrepreneur'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketbal',
                        '3': 'Football',
                        '4': 'Running',
                        '5': 'Climbing mountains',
                        '6': 'Riding',
                        '7': 'Table tennis',
                        '8': 'Karaoke'
                    }
                    return config[abc];
                }
            },
            {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: 'Address',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: 'Time to get up',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                fixed: 'left',
                dataIndex: 'id'
            },
            {
                title: 'User name',
                key: 'userName',
                width: 80,
                fixed: 'left',
                dataIndex: 'userName'
            },
            {
                title: 'Sex',
                key: 'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Just graduated',
                        '2': 'Employed',
                        '3': 'Master',
                        '4': 'Frontend Developer',
                        '5': 'Entrepreneur'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketbal',
                        '3': 'Football',
                        '4': 'Running',
                        '5': 'Climbing mountains',
                        '6': 'Riding',
                        '7': 'Table tennis',
                        '8': 'Karaoke'
                    }
                    return config[abc];
                }
            },
            {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            }, {
                title: 'Birthday',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: 'Address',
                key: 'address',
                width: 120,
                fixed: 'right',
                dataIndex: 'address'
            },
            {
                title: 'Time to get up',
                key: 'time',
                width: 80,
                fixed: 'right',
                dataIndex: 'time'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: 'User name',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: 'Sex',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Age',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: 'Status',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Just graduated',
                        '2': 'Employed',
                        '3': 'Master',
                        '4': 'Frontend Developer',
                        '5': 'Entrepreneur'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketbal',
                        '3': 'Football',
                        '4': 'Running',
                        '5': 'Climbing mountains',
                        '6': 'Riding',
                        '7': 'Table tennis',
                        '8': 'Karaoke'
                    }
                    return config[abc];
                }
            },
            {
                title: 'Birthday',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: 'Time to get up',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'User name',
                dataIndex: 'userName'
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Just graduated',
                        '2': 'Employed',
                        '3': 'Master',
                        '4': 'Frontend Developer',
                        '5': 'Entrepreneur'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': <Badge status="success" text="Succeed" />,
                        '2': <Badge status="error" text="Error" />,
                        '3': <Badge status="default" text="Nomal" />,
                        '4': <Badge status="processing" text="In Prodess" />,
                        '5': <Badge status="warning" text="Warning" />
                    }
                    return config[abc];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Operation',
                render: (text, item) => {
                    return <Button size="small" onClick={(item) => { this.handleDelete(item) }}>Delete</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="Top fixed">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="Left side fixed" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2650 }}
                    />
                </Card>
                <Card title="Sorting" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="Operation button" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}