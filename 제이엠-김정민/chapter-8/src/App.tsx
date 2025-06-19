import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";
import Counter from "./components/Counter";
import RandomNumberGenerator from "./components/RandomNumberGenerator";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
      <Modal />
      <Counter />
      <RandomNumberGenerator />
    </Provider>
  );
}

export default App;
