import React from 'react'
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber } from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends React.Component {

    state = {}

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} Congratulations! Current password is：${userInfo.userPwd}`)
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg: imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div>
                <Card title="Registration form">
                    <Form layout="horizontal">
                        <FormItem label="User name" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'User name cannot be empty'
                                        }
                                    ]
                                })(
                                    <Input placeholder="Please enter user name" />
                                )
                            }
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: ''
                                })(
                                    <Input type="password" placeholder="Please enter password" />
                                )
                            }
                        </FormItem>
                        <FormItem label="Sex" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">Male</Radio>
                                        <Radio value="2">Female</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="Age" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="Status" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value="1">Just graduated</Option>
                                        <Option value="2">Employed</Option>
                                        <Option value="3">Master</Option>
                                        <Option value="4">Frontend Developer</Option>
                                        <Option value="5">Entrepreneur</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="Hobby" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['2', '5']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">Swimming</Option>
                                        <Option value="2">Basketball</Option>
                                        <Option value="3">Football</Option>
                                        <Option value="4">Running</Option>
                                        <Option value="5">Climbing mountains</Option>
                                        <Option value="6">Riding</Option>
                                        <Option value="7">Table tennis</Option>
                                        <Option value="8">Karaoke</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="Married" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="Birthday" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday')(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="Address" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: 'BeiJing HaiDian'
                                })(
                                    <TextArea
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="Time to get up" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="Photo" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} /> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Checkbox>I have read<a href="#">the agreement</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>Register</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormRegister);