import { useContext } from "react";
import { currencyFormatter } from "../utils/formatter";
import Modal from "./UI/Modal";
import CartContext from "../Store/cartContext";

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    return (
        <Modal>
            <form action="">
                <h2>Chekout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            </form>
        </Modal>
    )
}