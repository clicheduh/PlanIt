import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { auth } = this.props;
        const { projects } = this.props;
        const { notifications } = this.props;

        // Checking if user is logged in or not. If not then it redirects to sign in page. If yes then it skips the if statement.
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div className="container dashboard">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    //Maps the state of redux store to props
    return {
        // Here the object returned are the properties that will be passed as props in this component
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    };
};

export default compose(
    connect(mapStateToProps), // Connects the dashboard component to the redux store
    firestoreConnect([
        // When this component is active, the collection that it listens to is the projects and notifications collection
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);
