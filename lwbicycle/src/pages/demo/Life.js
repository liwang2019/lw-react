import React from 'react'
import Child from './Child'
import { Button, Input } from 'antd'
import './index.less'
export default class Life extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         count:0
    //     };
    // }

    state = {
        count: 0
    }

    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleClick() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        let style = {
            padding: 50
        }
        return <div className="content">
            <p>Introduction of React life cycle</p>
            <Input></Input>
            <Button onClick={this.handleAdd} type="primary">AntD Click me</Button>
            <button onClick={this.handleAdd}>Clicke me</button>
            <button onClick={this.handleClick.bind(this)}>Click me</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}></Child>
        </div>
    }
}