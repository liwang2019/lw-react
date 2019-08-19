import React from 'react';
import ReactDOM from 'react-dom';


class Component extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: 'Old State'
        }
        console.log('initialization','constructor');
    }
    componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleClick(){
        console.log('Update data');
        this.setState({
            data: 'New State'
        });
    }
    render(){
        console.log('render')
        return (
            <div>
                <div>Props: {this.props.data}</div>
                <button onClick={()=>{this.handleClick()}}>Update component</button>
            </div>
        );
    }
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: 'Old Props',
            hasChild: true
        }
        console.log('initialization','constructor');
    }
    onPropsChange(){
        console.log('Update props:');
        this.setState({
            data: 'New Props'
        });
    }
    onDestoryChild(){
        console.log('Remove child component：');
        this.setState({
            hasChild: false
        });
    }
    render(){
        return (
        <div>
            {
                this.state.hasChild ? <Component data={this.state.data}/> : null
            }
            <button onClick={()=>{this.onPropsChange()}}>Change Props</button>
            <button onClick={()=>{this.onDestoryChild()}}>Remove child component</button>
        </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);