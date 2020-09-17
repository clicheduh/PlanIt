const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    // this is triggered when an HTTP request is made
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from clicheduh!');
});

const createNotification = (notification) => {
    return admin // to access something in cloud functions we access it from the admin
        .firestore()
        .collection('notifications')
        .add(notification)
        .then((doc) => {
            // doc is the newly added notification
            console.log('notification added', doc);
        });
};

exports.projectCreated = functions.firestore
    .document('projects/{projectId}') // it will trigger the function when new project is created (i.e. when new projectId is created in the projects collection)
    .onCreate((doc) => {
        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification); // this function expects some value hence we "return". It expects some kind of response to end the function.
    });

exports.userJoined = functions.auth.user().onCreate((user) => {
    // it will trigger the function when new user is created
    return admin
        .firestore() // using data of the user that got created in firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
            const newUser = doc.data();
            const notification = {
                content: 'Joined the party',
                user: `${newUser.firstName} ${newUser.lastName}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            };

            return createNotification(notification); // this function expects some value hence we "return". It expects some kind of response to end the function.
        });
});
