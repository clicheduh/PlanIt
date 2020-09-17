import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore'; // allows you to use firebase or firestore API inside action creator
import firebase from './config/fbConfig';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument({ getFirebase })) // .withExtraArgument allows to pass additional arguments to thunk. Basically it allows to pass an object in which getFirebase and getFirestore are two properties.
);

// react-redux-firebase config- used when to add a collection of users, then it is passed to rrfprops
const rrfConfig = {
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    userProfile: 'users'
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        ReactDOM.render(
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <App />
                </ReactReduxFirebaseProvider>
            </Provider>,
            document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <App />
                </ReactReduxFirebaseProvider>
            </Provider>,
            document.getElementById('root')
        );
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
