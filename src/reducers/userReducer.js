import React from 'react'

const initialState = {
    userInfo:{}
}

const userReducer=(state,action)=>{
    switch(action.type){
        case"LOGIN":{
            return{...state,userInfo:action.item}
        }

        case"LOGOUT":{
            return{...state,useInfo:action.item}
        }

        default:
            return state;
    }
}

export {initialState,userReducer}