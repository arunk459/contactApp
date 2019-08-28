const initialState = {
    contacts: []
};

const removeObjectFromArray = (id, array) => {
    return array.filter(item => (item.id !== id));
};

const updateObjectInArray = (payload, array) => {
    return array.map((item) => {
        if (item.uniqueId === payload.uniqueId) {
            return {
                ...item,
                ...payload
            };
        }
        return item;
    });
};

export default (state = initialState, action) => {
    console.log("Action",action);

    switch (action.type) {
    case "ADD_CONTACT":
        return {
            ...state,
            contacts: [
                ...state.contacts,
                action.payload
            ]
        };

    case "REMOVE_CONTACT":
        return {
            ...state,
            contacts: removeObjectFromArray(action.payload, state.contacts),
        };
    case "UPDATE_CONTACT_DETAILS":
        return {
            ...state,
            contacts: updateObjectInArray(action.payload, state.contacts)
        };    

    default:
        return state;
    }

};
