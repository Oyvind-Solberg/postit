import React, { useEffect } from 'react';
import { useStore } from './store/store';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as firebase from './firebase/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { colorTheme } from './shared/styles/colorTheme';

import Feed from './containers/Feed/Feed';
import Submit from './containers/Submit/Submit';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Logout from './containers/Logout/Logout';

function App() {
	const dispatch = useStore(false)[2];
	const theme = createMuiTheme({
		typography: {
			htmlFontSize: 10,
			fontSize: 9,
		},
		palette: {
			primary: {
				main: colorTheme.primary,
			},
			secondary: {
				main: colorTheme.secondary,
			},
			neutral: {
				main: colorTheme.neutral,
			},
			background: {
				default: colorTheme.neutral,
			},
		},
	});

	useEffect(() => {
		firebase.checkAuth((user) => {
			if (user) {
				dispatch('SET_IS_LOGGED_IN', true);
				dispatch('SET_USER', { username: user.displayName });
			} else {
				dispatch('SET_IS_LOGGED_IN', false);
				dispatch('SET_USER', null);
			}

			dispatch('SET_IS_LOADING', false);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route path="/" exact component={Feed} />
				<Route path="/submit" exact component={Submit} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/logout" exact component={Logout} />
				<Redirect to="/" />
			</Switch>
		</ThemeProvider>
	);
}

export default withRouter(App);
