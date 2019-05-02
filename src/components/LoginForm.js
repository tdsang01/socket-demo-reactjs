import React, { Component } from 'react';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { token } = this.state;
        this.props.handleLogin(token);
    };

    handleChange = (e) => {
        this.setState({ token: e.target.value });
    };

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="token">
                        <h2>Passing token :D</h2>
                    </label>
                    <input
                        type = "text"
                        id = "token"
                        onChange = { this.handleChange }
                    />
                </form>
            </div>
        )
    }
}
