const initState = {
    projects: [
        { id: 1, title: 'help me find alaska', content: 'blah blah blah' },
        { id: 2, title: 'take me to church', content: 'yada yada yada' },
        { id: 3, title: 'memories bring back memories', content: 'yap yap yap' }
    ]
};

// const projectReducer = (state = initState, action) => {
//     if (action.type === 'CREATE_PROJECT') {
//         console.log('project made woohoo', action.project);
//         return state;
//     } else if (action.type === 'CREATE_PROJECT_ERROR') {
//         console.log('project error occurred', action.err);
//         return state;
//     }
//     return state;
// };

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('project created woohoo', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('project error occured', action.project);
            return state;
        default:
            return state;
    }
};

export default projectReducer;
