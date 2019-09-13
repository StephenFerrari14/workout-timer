import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

const Root = () => {
    return (
      <App />
    )
}

render(<Root/>, document.querySelector('#root'));
