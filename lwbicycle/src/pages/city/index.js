import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {

    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list: list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code == '0') {
                message.success('Open city succeed');
                this.setState({
                    isShowOpenCity: false
                })
                this.requestList();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'City ID',
                dataIndex: 'id'
            }, {
                title: 'City name',
                dataIndex: 'name'
            }, {
                title: 'Mode',
                dataIndex: 'mode',
                render(mode) {
                    return mode == 1 ? 'Allowed area' : 'Prohibited area';
                }
            }, {
                title: 'Operatin mode',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? 'Own' : 'franchisee';
                }
            }, {
                title: 'Franchisee',
                dataIndex: 'franchisee_name'
            }, {
                title: 'City manager',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: 'Open time',
                dataIndex: 'open_time'
            }, {
                title: 'Operation time',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, {
                title: 'Operator',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>Open city</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="Open city"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => { this.cityForm = inst; }} />
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="City">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">BeiJing</Option>
                                <Option value="2">TianJin</Option>
                                <Option value="3">ShenZhen</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Mode">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 120 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">Allowed area</Option>
                                <Option value="2">Prohibited area</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Opearation mode">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">Own</Option>
                                <Option value="2">Franchisee</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Authorization status">
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">Authorized</Option>
                                <Option value="2">Not authorized</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>Search</Button>
                    <Button>Reset</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="Choose city" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">All</Option>
                                <Option value="1">BeiJing</Option>
                                <Option value="2">TianJin</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Mode" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">Own</Option>
                                <Option value="2">Franchisee</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Operation mode" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">Allowe area</Option>
                                <Option value="2">Prohibited area</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);