import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem : (item) => {},
    removeItem : (id) => {}
})

function cartReducer(state, action){
    if(action.type === "ADD_ITEM"){
        const exsistingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];

        if(exsistingCartItemIndex > -1){
            const exsistingItem = state.items[exsistingCartItemIndex];
            const updatedItem = {
                ...exsistingItem,
                quantity : exsistingItem.quantity + 1
            }
            updatedItems[exsistingCartItemIndex] = updatedItem
        }else {
            updatedItems.push({...action.item , quantity:1})
        }
        return {...state , items: updatedItems }
    }

    if(action.type === "REMOVE_ITEM"){
         const exsistingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
         const exsistingCartItem = state.items[exsistingCartItemIndex];
         const updatedItems = [...state.items];
         
         if(exsistingCartItem.quantity === 1){
            updatedItems.splice(exsistingCartItemIndex,1)
         }else {
            const updatedItem = {
                ...exsistingCartItem,
                quantity: exsistingCartItem.quantity - 1,
            }
            updatedItems = updatedItem
         }
         return {...state, items: updatedItems}
    }
    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    function addItem(item){
        dispatchCartAction({action: "ADD_ITEM", item})

    }
    function removeItem(id){
        dispatchCartAction({action: "REMOVE_ITEM", id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext