import React from 'react'

const initialState = {
    userInfo:{}
}

//action -log in or log out
const userReducer=(state,action)=>{ //reduce the state to manage the user information
    switch(action.type){
        case"LOGIN":{
            return{...state,userInfo:action.item}  //we are putting usrInfo item into the state
        }

        case"LOGOUT":{
            return{...state,useInfo:action.item}
        }

        default:
            return state;
    }
}

export {initialState,userReducer}