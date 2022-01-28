import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import  { Provider} from "react-redux";

import store from "../src/components/Reducer/store";


  ReactDOM.render(
  

   
    <Provider  store={ store }>
     
      <App />

    
  </Provider>,
    document.getElementById('root')
  );

