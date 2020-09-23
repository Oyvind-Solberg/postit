import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { colorTheme } from './shared/styles/colorTheme';

import Feed from './containers/Feed/Feed';
import Submit from './containers/Submit/Submit';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

function App() {
	const theme = createMuiTheme({
		typography: {
			htmlFontSize: 10,
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route path="/" exact component={Feed} />
				<Route path="/submit" exact component={Submit} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Redirect to="/" />
			</Switch>
		</ThemeProvider>
	);
}

export default withRouter(App);
