import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/core/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
require("dotenv").config();

ReactDOM.render(
	<App />,
	document.getElementById('root')
);