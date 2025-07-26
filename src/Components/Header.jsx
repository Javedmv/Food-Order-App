import { useContext } from "react"
import LogoImg from "../assets/logo.jpg"
import Button from "./UI/button"
import CartContext from "../Store/cartContext"

export default function Header(){
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0) 

    return (
        <header id="main-header">
            <div id="title">
                <img src={LogoImg} alt="A Restaurant Image" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}