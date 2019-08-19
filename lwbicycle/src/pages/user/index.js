import React from 'react';
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends React.Component {

    params = {
        page: 1
    }

    state = {
        isVisible: false
    }

    formList = [
        {
            type: 'INPUT',
            label: 'User name',
            field: 'user_name',
            placeholder: 'Please enter user name',
            width: 130,
        }, {
            type: 'INPUT',
            label: 'User phone number',
            field: 'user_mobile',
            placeholder: 'Please enter user phone number',
            width: 140,
        }, {
            type: 'DATE',
            label: 'Please choose a date',
            field: 'user_date',
            placeholder: 'Please enter a date',
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/user/list', this.params);
    }

    hanleOperate = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: 'Create employee'
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: "Prompt",
                    content: 'Please choose a user'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: 'Edit employee',
                userInfo: item
            })
        } else if (type == 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: 'Employee detail',
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: "Propmt",
                    content: 'Please choose a user'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: 'Confirm delete',
                content: 'Are you sure you want to delete current employee?',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: 'User name',
                dataIndex: 'username'
            }, {
                title: 'Sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            }, {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': 'Just graduated',
                        '2': 'Employed',
                        '3': 'Master',
                        '4': 'Frontend Developer',
                        '5': 'Entrepreneur'
                    }[state]
                }
            }, {
                title: 'Hobby',
                dataIndex: 'interest',
                render(interest) {
                    return {
                        '1': 'Swimming',
                        '2': 'Basketbal',
                        '3': 'Football',
                        '4': 'Running',
                        '5': 'Climbing mountains',
                        '6': 'Riding',
                        '7': 'Table tennis',
                        '8': 'Karaoke'
                    }[interest]
                }
            }, {
                title: 'Birthday',
                dataIndex: 'birthday'
            }, {
                title: 'Address',
                dataIndex: 'address'
            }, {
                title: 'Time to get up',
                dataIndex: 'time'
            },
        ]
        let footer = {};
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.hanleOperate('create')}>Create employee</Button>
                    <Button type="primary" icon="edit" onClick={() => this.hanleOperate('edit')}>Edit employee</Button>
                    <Button type="primary" onClick={() => this.hanleOperate('detail')}>Employee detail</Button>
                    <Button type="primary" icon="delete" onClick={() => this.hanleOperate('delete')}>Delete employee</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => { this.userForm = inst; }} />
                </Modal>
            </div>
        );
    }
}
class UserForm extends React.Component {

    getState = (state) => {
        return {
            '1': 'Just graduated',
            '2': 'Employed',
            '3': 'Master',
            '4': 'Frontend Developer',
            '5': 'Entrepreneur'
        }[state]
    }

    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="User name" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.username :
                            getFieldDecorator('user_name', {
                                initialValue: userInfo.username
                            })(
                                <Input type="text" placeholder="Please enter user name" />
                            )
                    }
                </FormItem>
                <FormItem label="Sex" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex == 1 ? 'Male' : 'Female' :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>Male</Radio>
                                    <Radio value={2}>Female</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="Status" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state', {
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>Just graduated</Option>
                                    <Option value={2}>Employed</Option>
                                    <Option value={3}>Master</Option>
                                    <Option value={4}>Frontend Developer</Option>
                                    <Option value={5}>Entrepreneur</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="Birthday" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker />
                            )
                    }
                </FormItem>
                <FormItem label="Address" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder="Please enter address" />
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);