import React from 'react'
import { Link } from 'react-router-dom'
export default class Main extends React.Component {

    render() {
        return (
            <div>
                this is main page.
                <br />
                <Link to="/main/test-id">Embeded route</Link>
                <br />
                <Link to="/main/456">Embeded route 2</Link>
                <hr />
                {this.props.children}
            </div>
        );
    }
}