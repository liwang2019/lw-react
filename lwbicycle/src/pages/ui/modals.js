import React from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'
export default class Buttons extends React.Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }

    handleConfirm = (type) => {
        Modal[type]({
            title: 'Confirmed?',
            content: 'Are you sure that you finished learning React?',
            onOk() {
                console.log('Ok')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="Basic modal" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>Custom footer</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>Top 20px Modal</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>Horizontal and vertical center</Button>
                </Card>
                <Card title="Confirmation modal" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}
                >
                    <p>Welcome to React advanced course</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="OK"
                    cancelText="Cancel"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>Welcome to React advanced course</p>
                </Modal>
                <Modal
                    title="React"
                    style={{ top: 20 }}
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>Welcome to React advanced course</p>
                </Modal>
                <Modal
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>Welcome to React advanced course</p>
                </Modal>
            </div>
        );
    }
}