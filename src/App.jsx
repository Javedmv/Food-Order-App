import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./Components/Cart.jsx";
import { CartContextProvider } from "./Store/cartContext.jsx";
import { UserProgressContextProvider } from "./Store/userProgressContext.jsx";


function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <Meals/>
        <Cart/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
