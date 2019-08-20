import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils';
export default class BasicTable extends React.Component {

    state = {
        dataSource2: []
    }

    params = {
        page: 1
    }

    componentDidMount() {
        const data = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: 'HaiDian district, BeiJing',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: 'HaiDian district, BeiJing',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: 'HaiDian district, BeiJing',
                time: '09:00'
            },
        ]
        data.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
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
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: 'Information',
            content: `User name：${record.userName},user hobby：${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id)
        })
        Modal.confirm({
            title: 'Delete prompt',
            content: `Do you really want to delete these datas?${ids.join(',')}`,
            onOk: () => {
                message.success('Delete succeed');
                this.request();
            }
        })
    })

    render() {
        const columns = [
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
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="Basic table">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="Dynamic data -Mock" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-single selection" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-multi selection" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-Pagination" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}