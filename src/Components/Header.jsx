import { useContext } from "react"
import LogoImg from "../assets/logo.jpg"
import Button from "./UI/button"
import CartContext from "../Store/cartContext"
import UserProgressContext from "../Store/userProgressContext";

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0) 

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={LogoImg} alt="A Restaurant Image" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}