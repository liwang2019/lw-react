import React from 'react'
import { Card, Button, Form, Select, Modal, Input, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'
const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends React.Component {

    state = {}
    componentWillMount() {
        axios.requestList(this, '/role/list', {});
    }
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.roleForm.props.form.resetFields();
                axios.requestList(this, '/role/list', {});
            }
        })
    }

    handlePermission = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                text: 'Please choose 1 role'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    handlePermEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isPermVisible: false
                })
                axios.requestList(this, '/role/list', {});
            }
        })
    }

    hanldeUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                text: 'Please choose 1 role'
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id);
    }

    getRoleUserList = (id) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if (res) {
                this.getAuthUserList(res.result);
            }
        })
    }

    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if (data.status == 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData, targetKeys
            })
        }
    }

    handleUserSubmit = () => {
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isUserVisible: false
                })
                axios.requestList(this, '/role/list', {});
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'Role ID',
                dataIndex: 'id'
            }, {
                title: 'Role name',
                dataIndex: 'role_name'
            }, {
                title: 'Creation time',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: 'Status',
                dataIndex: 'status',
                render(status) {
                    return status == 1 ? 'In use' : 'Stopped'
                }
            }, {
                title: 'Authorization time',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: 'Authorizer',
                dataIndex: 'authorize_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>Create role</Button>
                    <Button type="primary" style={{ marginLeft: 10, marginRight: 10 }} onClick={this.handlePermission}>Set up permission</Button>
                    <Button type="primary" onClick={this.hanldeUserAuth}>Authorize user</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="Create role"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst}></RoleForm>
                </Modal>
                <Modal
                    title="Set up permission"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={(inst) => this.permForm = inst}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="Authorize user"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        );
    }
}
class RoleForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="Role name" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="Please enter role name" />
                        )
                    }
                </FormItem>
                <FormItem label="Status" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>In use</Option>
                                <Option value={0}>Stopped</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

class PermEditForm extends React.Component {

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode {...item} />
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="Role name" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="Status" {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">In use</Option>
                                <Option value="0">Stopped</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="Platform Permission" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
PermEditForm = Form.create({})(PermEditForm);

class RoleAuthForm extends React.Component {

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="Role name" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="Choose user" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        dataSource={this.props.mockData}
                        titles={['User to be choosed', 'Choosed user']}
                        showSearch
                        searchPlaceholder='Please enter user name'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        );
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);