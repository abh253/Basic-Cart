import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const defaultState={
    loading:false,
    cart:cartItems,
    total:0,
    amount:0
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchdata=async()=>{
    dispatch({type:'LOADING'})
    const response =await fetch(url);
    const cart=await response.json();
    dispatch({type:'DISPLAY-CART',payLoad:cart})
  }

  useEffect(()=>{
    fetchdata();
  },[])

  useEffect(()=>{
    dispatch({type:'GET-TOTAL'})

  },[state.cart])

  const clearCart=()=>{
    dispatch({type:'CLEAR-CART'});
  }
  const remove=(id)=>{
    dispatch({type:'REMOVE',payLoad:id});
  }
  const increase=(id)=>{
    dispatch({type:'INCREASE',payLoad:id})
  }
  const decrease=(id)=>{
    dispatch({type:'DECREASE',payLoad:id})
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
