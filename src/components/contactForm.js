import React from 'react';
import { View, Text, TextInput, Button, FlatList,TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import {reduxForm, Field, formValueSelector} from "redux-form";

import { addContact,deleteContact,updateContact } from '../actions/contactAction';


class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            number: ""
        }
    }
    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    addContact = ()=>{
        if(this.state.name.length > 0 || this.state.email.length > 0 || this.state.number.length > 0){
          let id =  this.createRandomId();
          let obj = {
              id: id,
              name: this.state.name,
              email: this.state.email,
              number: this.state.number
          }
          console.log("obj",obj);
            this.props.addContact(obj)
        }
        console.log("this.state", this.state);
    }
    onChangeName = (name)=>{
        this.setState({name});
    }
    onChangeEmail = (email)=>{
        this.setState({email});
    }
    onChangeNumber = (number)=>{
        this.setState({number});
    }

    _renderItem = ({item}) => {
        // console.log("item",item.id);
        return(
            <View style={{flex:1,backgroundColor:'red'}}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.number}</Text>
            <TouchableOpacity onPress={()=>{
                this.props.deleteContact(item.id)}}>
                <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                this.props.editContact(item.id)}}>
                <Text>Edit</Text>
            </TouchableOpacity>
            </View>
        )
    }
    
    render(){
        return(
            <View style={{flex: 1}}>
                <TextInput 
                onChangeText={this.onChangeName}
                placeholder="name"
                />
                <TextInput 
                onChangeText={this.onChangeEmail}
                placeholder="Email"
                />
                <TextInput 
                onChangeText={this.onChangeNumber}
                placeholder="Number"
                />
                <Button title="submit" onPress={this.addContact}/>
                <FlatList
                  data={this.props.contacts}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
              />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    contacts: state.contactReducer.contacts
});
  
const mapDispatchToProps = dispatch => {
    return{
        addContact: (contact) => dispatch(addContact(contact)),
        deleteContact: (id) => dispatch(deleteContact(id)),
        editContact: (id)=> dispatch(updateContact(id))
}};

export default connect(mapStateToProps,mapDispatchToProps)(ContactForm);


