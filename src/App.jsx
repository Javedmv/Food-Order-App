import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./Components/Cart.jsx";
import { CartContextProvider } from "./Store/cartContext.jsx";
import { UserProgressContextProvider } from "./Store/userProgressContext.jsx";
import Checkout from "./Components/Checkout.jsx";


function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <Meals/>
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
