export const createProject = (project) => {
    return (dispatch, getState, { getFirebase }) => {
        // getFirebase and getFirestore are destructured

        const firestore = getFirebase().firestore();
        const authorId = getState().firebase.auth.uid;
        firestore
            .collection('projects')
            .add({
                ...project, // same as project.title, project.content
                authorFirstName: 'Aditya',
                authorLastName: 'Shrivastav',
                authorId: authorId,
                createdAt: new Date()
            })
            .then(() => {
                // adding this collection to firestore is asynchronous i.e. it takes some time to do hence we used then method so that it only dispatches when this asynchronous call is completed.
                // make async call to database
                dispatch({ type: 'CREATE_PROJECT', project: project });
            })
            .catch((err) => {
                dispatch({ type: 'CREATE_PROJECT_ERROR', err: err });
            });
    };
};
