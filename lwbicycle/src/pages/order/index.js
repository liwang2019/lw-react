import React from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component {
    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: 'City',
            field: 'city',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'BeiJing' }, { id: '2', name: 'TianJin' }, { id: '3', name: 'ShangHai' }]
        },
        {
            type: 'search_time'
        },
        {
            type: 'SELECT',
            label: 'Order status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'In Processing' }, { id: '2', name: 'Finished' }]
        }
    ]
    componentDidMount() {
        this.requestList()
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.requestList(this, '/order/list', this.params, true)
    }
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'Information',
                content: 'Please choose one order to stop'
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('Stop order succeed')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'Information',
                content: 'Please choose 1 order'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }
    render() {
        const columns = [
            {
                title: 'Order number',
                dataIndex: 'order_sn'
            },
            {
                title: 'Bike number',
                dataIndex: 'bike_sn'
            },
            {
                title: 'User name',
                dataIndex: 'user_name'
            },
            {
                title: 'Phone number',
                dataIndex: 'mobile'
            },
            {
                title: 'Mileage',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: 'Driving time',
                dataIndex: 'total_time'
            },
            {
                title: 'Status',
                dataIndex: 'status'
            },
            {
                title: 'Start time',
                dataIndex: 'start_time'
            },
            {
                title: 'End time',
                dataIndex: 'end_time'
            },
            {
                title: 'Order price',
                dataIndex: 'total_fee'
            },
            {
                title: 'Paid amount',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>Order detail</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>Stop order</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="Stop order"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="Bike number" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="Remaining battery" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="Start time" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="Current location" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}