import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };
    render() {
        const { authError } = this.props;
        const { auth } = this.props;

        // Checking if user is logged in or not. If not then it redirects to sign in page. If yes then it skips the if statement.
        if (auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <form
                    onSubmit={this.handleSubmit}
                    className="white"
                    autoComplete="off"
                >
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Login
                        </button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => {
            dispatch(signIn(credentials));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
