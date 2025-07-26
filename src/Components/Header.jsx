import LogoImg from "../assets/logo.jpg"
import Button from "./UI/button"

export default function Header(){
    return (
        <header id="main-header">
            <div id="title">
                <img src={LogoImg} alt="A Restaurant Image" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    )
}