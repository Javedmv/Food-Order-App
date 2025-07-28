import { useContext } from "react";
import { currencyFormatter } from "../utils/formatter";
import Modal from "./UI/Modal";
import CartContext from "../Store/cartContext";
import Input from './UI/Input';
import Button from './UI/button';
import UserProgressContext from "../Store/userProgressContext";
import useHttp from "./Hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    }
};

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const {isLoading , data, error, sendRequest ,clearData } = useHttp("http://localhost:3000/orders", requestConfig)

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    // getting data from form
    async function checkoutAction(prevState, fd){
        const customerData = Object.fromEntries(fd.entries());
        await sendRequest(JSON.stringify({
            order:{
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null)

    let actions = (
        <>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
        </>
    )

    if(isSending){
        actions = <span>Sending Order data...</span>
    }

    if(data && !error){
        return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
                <h2>Success!!</h2>
                <p>Your order was submitted successfully!!!</p>
                <p>We will get back to you with more details via email within the next few minutes</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form action={formAction}>
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
            {error && <Error title="Failed to submit order" message={error}/>} 
            <p className="modal-actions">
                {actions}
            </p>
        </Modal>
    )
}