import { useContext } from "react";
import { currencyFormatter } from "../utils/formatter";
import Modal from "./UI/Modal";
import CartContext from "../Store/cartContext";
import Input from './UI/Input';
import Button from './UI/button';
import UserProgressContext from "../Store/userProgressContext";

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose(){
        userProgressCtx.hideCheckout();
    }
    function handleSubmit(e){
        e.preventDefaut();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());
        fetch("http://localhost:3000/orders",{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        })
    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onClick={handleSubmit}>
                <h2>Chekout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            </form>
            <Input label="Full Name" id="name" type="text"/>
            <Input label="E-Mail Address" id="email" type="email"/>
            <Input label="Street" id="street" type="text"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city"/>
            </div>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </Modal>
    )
}