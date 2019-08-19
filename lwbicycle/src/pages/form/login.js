import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
class FormLogin extends React.Component {

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.userName} Congratulation, you passed. Your password is：${userInfo.userPwd}`)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="Login inline form">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="Please enter user name" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="Please enter password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="Login horizontal form" style={{ marginTop: 10 }}>
                    <Form style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'User name cannot be empty'
                                        },
                                        {
                                            min: 5, max: 10,
                                            message: 'Length is not in valid scope'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: 'User name must be character or number'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="Please enter user name" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="Please enter password" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>Remember password</Checkbox>
                                )
                            }
                            <a href="#" style={{ float: 'right' }}>Forgot password</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormLogin);