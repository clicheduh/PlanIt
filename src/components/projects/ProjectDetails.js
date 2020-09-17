import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ProjectDetails = (props) => {
    const { project } = props;
    if (project) {
        const { auth } = props;

        // Checking if user is logged in or not. If not then it redirects to sign in page. If yes then it skips the if statement.
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">
                            Project Details: {project.title}
                        </span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>
                            Posted by {project.authorFirstName}{' '}
                            {project.authorLastName}
                        </div>
                        <div>
                            {moment(project.createdAt.toDate()).calendar()}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <span>Project loading...</span>;
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;

    /*
        if(projects) {
            const project = projects[id];
        } else {
            null;
        } 
    */
    /* The above written commented code is the same as below written statement */
    const project = projects ? projects[id] : null;
    return {
        project: project,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'projects' }])
)(ProjectDetails);
