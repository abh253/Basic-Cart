const reducer = (state, action) => {
    if (action.type === 'CLEAR-CART') {
        return { ...state, cart: [] };
    }
    if (action.type === 'REMOVE') {
        const id = action.payLoad;
        const newCart = state.cart.filter((item) => item.id !== id);
        return { ...state, cart: newCart };
    }
    if (action.type === 'INCREASE') {
        const id = action.payLoad;
        const newItem = state.cart.map((item) => {
            if (item.id === id) {
                return {...item,amount:item.amount+1};
            }
            return item;
        }
        );
        return { ...state, cart: newItem }
    }
    if (action.type === 'DECREASE') {
        const id = action.payLoad;
        const newCart= (state.cart.map((item) => {
            if (item.id === id) {
                return {...item,amount:item.amount-1}
            }
            return item;
        }
        )).filter((item) => item.amount !== 0);
        return {...state,cart:newCart}
    }
    if(action.type==='GET-TOTAL'){
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
              const { price, amount } = cartItem
              const itemTotal = price * amount
      
              cartTotal.total += itemTotal
              cartTotal.amount += amount
              return cartTotal
            },
            {
              total: 0,
              amount: 0,
            }
          )
          total = parseFloat(total.toFixed(2))
      
          return { ...state, total, amount }
    }
    if(action.type==='LOADING'){
        return {...state,loading:true}

    }
    if(action.type==='DISPLAY-CART'){
        return {...state,loading:false,cart:action.payLoad}
    }
    return state;
}
export default reducer;