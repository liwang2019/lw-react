import React from 'react'
export default class Info extends React.Component {

    render() {
        return (
            <div>
                This part test dynamic route.
                Dynamic route is：{this.props.match.params.value}
            </div>
        );
    }
}