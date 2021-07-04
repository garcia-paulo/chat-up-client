import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../pages/Main'
import ConversationProvider from '../contexts/ConversationContext';

export default function Router() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/register" component={Signup} />
				<ConversationProvider>
					<Route exact path="/main" component={Main} />
				</ConversationProvider>
			</Switch>
		</div>
	)
}
