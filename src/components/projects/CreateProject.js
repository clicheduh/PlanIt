import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
    state = {
        title: '',
        content: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    };
    render() {
        const { auth } = this.props;

        // Checking if user is logged in or not. If not then it redirects to sign in page. If yes then it skips the if statement.
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div className="container">
                <form
                    onSubmit={this.handleSubmit}
                    className="white"
                    autoComplete="off"
                >
                    <h5 className="grey-text text-darken-3">
                        Create new project
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project content</label>
                        <textarea
                            id="content"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => {
            dispatch(createProject(project));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
