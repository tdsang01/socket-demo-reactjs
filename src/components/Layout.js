import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ChatContainer from './ChatContainer';
import SocketHandler from '../socket-handler/initialize'

export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            token: null
        }
    }

    initSocket = (token) => {
        const socket = SocketHandler.connect(token);
        this.setState({ token, socket });
    };

    render() {
        const { token, socket } = this.state;
        return (
            !token
                ? <LoginForm  handleLogin={this.initSocket}/>
                : <ChatContainer socket={socket}/>
        );
    }
}
