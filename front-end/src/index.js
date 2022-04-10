import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { hydrate } from './features/cart/cartSlice3' 
store.subscribe(() => {
  localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
})
const getCartItemsFromLocalStorage = () => {
  try {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) return JSON.parse(savedCartItems);
  }
  catch(e){
    console.log(e);
  }
}
const displayCartItems = getCartItemsFromLocalStorage();
if(displayCartItems) {
  
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
