import React, { Component } from 'react';

export default class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            data: [],
            messages: [],
            message: null
        }
    }

    componentWillMount() {
        const { socket } = this.props;
        this.setState({ socket });
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('notification/assign', (response) => {
            const data = this.state.data;
            data.push(response.data);
            this.setState({ data });
        });
        socket.on('node/create', (response) => {
            // socket join node
            socket.emit('node/join', { id: response.data._id }, (response) => {
                console.log('node/join ->', response);
            })
        });
        socket.on('messages', (data) => {
            console.log('messages data: ', data);
        });
        socket.on('message/receive', data => {
            console.log('message/receive: ', {data});
            const { messages } = this.state;
            messages.push(data);
            this.setState({ messages });
        })
    }

    renderNotification = (data) => {
        return data.map((item, index) => {
            return <li key={index}>{item.audioUrl}</li>
        });
    };

    renderMessages = (data) => {
        return data.map((item, index) => {
            return <li key={index}>{`${item.data.author.name}: ${item.data.content}`}</li>
        });
    };

    handleReadNotification = () => {
        const { socket } = this.state;
        const notificationId = '5cb7fc72f3936e41bf385f70';
        console.log('Clicked');
        socket.emit('notification/read', { id: notificationId }, (err, data) => {
            if (err) {
                console.error('Event: notification/read -> ', err);
            } else {
                console.log(data);
            }
        })
    };

    handleChangeInputMessage = (e) => {
        this.setState({ message: e.target.value });
    };

    handleSendMessage = () => {
        const { socket, message } = this.state;
        const highlightNodeId = '5cb84eaee9000e381f474799';
        socket.emit('message/create', { content: message, highlightNode: highlightNodeId }, (err, response) => {
            if (err) {
                console.error('message/create error: ', err);
            } else {
                console.log('message/create data: ', response);
            }
        });
    };

    render() {
        const { data, messages } = this.state;
        const notifications = this.renderNotification(data);
        const listMessages = this.renderMessages(messages);
        return (
            <div>
                <div>
                    <h1>Notifications</h1>
                    <ul>{notifications}</ul>
                </div>
                <div>
                    <h1>Read notification</h1>
                    <button onClick={this.handleReadNotification}>Read</button>
                </div>
                <div>
                    <h1>Messages</h1>
                    <div>
                        <h3>
                            Receive messages
                        </h3>
                        <ul>{listMessages}</ul>
                    </div>
                    <div>
                        <h3>Send message</h3>
                        <div className="send-message">
                            <input
                                type = "text"
                                onChange = { this.handleChangeInputMessage }
                            />
                            <button onClick={this.handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

