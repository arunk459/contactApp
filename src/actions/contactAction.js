export const addContact = (contact)=>{
    console.log("contact",contact);
    return {
        type: "ADD_CONTACT",
        payload: contact
    }
}
export const deleteContact = (id)=>{
    console.log("id",id);

    return {
        type: "REMOVE_CONTACT",
        payload: id
    }
}
export const updateContact = (contact)=>{
    return {
        type: "UPDATE_CONTACT_DETAILS",
        payload: contact
    }
}