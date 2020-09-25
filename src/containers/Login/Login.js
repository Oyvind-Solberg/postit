import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import styled from 'styled-components';
import { useStore } from '../../store/store';
import PageNav from '../../components/Navigation/PageNav/PageNav';

const Container = styled.div`
	height: 100%;
	overflow: hidden;
	background-color: white;
	padding: 2rem;
`;

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formIsValid, setFormIsValid] = useState(false);

	const dispatch = useStore(false)[1];

	const simpleValidation = (newValue) => {
		let currentEmail;
		let currentPassword;

		if (newValue.email || newValue.email === '') {
			currentEmail = newValue.email;
			currentPassword = password;
		} else if (newValue.password || newValue.password === '') {
			currentPassword = newValue.password;
			currentEmail = email;
		}

		if (currentEmail === '' || currentPassword === '') {
			setFormIsValid(false);
		} else setFormIsValid(true);
	};

	const handleEmailChange = (event) => {
		let input = event.target.value;
		setEmail(input);
		simpleValidation({ email: input });
	};

	const handlePasswordChange = (event) => {
		let input = event.target.value;
		setPassword(input);
		simpleValidation({ password: input });
	};

	const handleSubmit = () => {
		dispatch('LOG_IN', { email, password });
	};

	return (
		<Container>
			<Hidden mdUp>
				<PageNav />
			</Hidden>
			<Typography>Login</Typography>
			<form>
				<TextField
					id="email"
					label="Email"
					type="email"
					required
					fullWidth
					onChange={handleEmailChange}
					value={email}
				/>
				<TextField
					id="password"
					label="Password"
					required
					type="password"
					fullWidth
					onChange={handlePasswordChange}
					value={password}
				/>
				<Button
					onClick={handleSubmit}
					variant="contained"
					fullWidth
					disabled={!formIsValid}
				>
					Log In
				</Button>
			</form>
			<Typography>
				New to Postit?
				<Hidden mdUp>
					<MaterialUILink component={Link} to="/register">
						Sign Up
					</MaterialUILink>
				</Hidden>
				<Hidden smDown>
					<Button onClick={props.handleSignupDialog}>Sign Up</Button>
				</Hidden>
			</Typography>
		</Container>
	);
};

export default Login;
