import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import CalenderTodo from './components/CalenderTodo';

ReactDom.render(<Provider store={store()}><CalenderTodo/></Provider>,document.querySelector('#root'));