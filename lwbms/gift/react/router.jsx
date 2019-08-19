window.location.href = 'http://www.baidu.com';
history.back();

window.location = '#hash';
window.onhashchange = function(){
    console.log('current hash:', window.location.hash);
}

history.pushState('name', 'title', '/path');
history.replaceState('name', 'title', '/path');
// popstate
window.onpopstate = function(){
    console.log(window.location.href);
    console.log(window.location.pathname);
    console.log(window.location.hash);
    console.log(window.location.search);
}


// react-router
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


class A extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
            Component A
            
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={(route) => {
                    return <div>Current component is component A without parameter</div>
                }}/>
                <Route path={`${this.props.match.path}/sub`} render={(route) => {
                    return <div>Current component is Sub</div>
                }}/>
                <Route path={`${this.props.match.path}/:id`} render={(route) => {
                    return <div>Current component is component A with parameter, parameter is：{route.match.params.id}</div>
                }}/>
            </Switch>
            </div>
        )
    }
}

class B extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>Component B</div>
    }
}

class Wrapper extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Link to="/a">Component A</Link>
                <br/>
                <Link to="/a/123">Component A with parameter</Link>
                <br/>
                <Link to="/b">Component B</Link>
                <br/>
                <Link to="/a/sub">/a/sub</Link>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A}/>
            <Route path="/b" component={B}/>
        </Wrapper>
    </Router>,
    document.getElementById('app')
);