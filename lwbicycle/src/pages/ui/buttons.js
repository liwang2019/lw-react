import React from 'react'
import { Card, Button, Radio } from 'antd'
import './ui.less'
export default class Buttons extends React.Component {

    state = {
        loading: true,
        size: 'default'
    }

    handleCloseLoading = () => {
        this.setState({
            loading: false
        });
    }

    handleChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="Basic button" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="Icon button" className="card-wrap">
                    <Button icon="plus">Create</Button>
                    <Button icon="edit">Edit</Button>
                    <Button icon="delete">Delete</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">Search</Button>
                    <Button type="primary" icon="download">Download</Button>
                </Card>
                <Card title="Loading button" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>Confirm</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading} >Click to load</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>Close</Button>
                </Card>
                <Card title="Button group" style={{ marginBottom: 10 }}>
                    <Button.Group>
                        <Button type="primary" icon="left">Back</Button>
                        <Button type="primary" icon="right">Proceed</Button>
                    </Button.Group>
                </Card>
                <Card title="Button size" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">small</Radio>
                        <Radio value="default">medium</Radio>
                        <Radio value="large">large</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button type="danger" size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        );
    }
}