import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import styled from 'styled-components';
import { useStore } from '../../store/store';

const Container = styled.div`
	max-height: 100vh;
	overflow: hidden;
	background-color: white;
`;

const Register = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [formIsValidStep1, setFormIsValidStep1] = useState(false);
	const [formIsValidStep2, setFormIsValidStep2] = useState(false);
	const [formStep, setFormStep] = useState(1);

	const dispatch = useStore(false)[1];

	const simpleValidationStep1 = (newValue) => {
		let userName;

		if (newValue.email || newValue.email === '') {
			userName = newValue.email;
		}

		if (userName === '') {
			setFormIsValidStep1(false);
		} else setFormIsValidStep1(true);
	};

	const simpleValidationStep2 = (newValue) => {
		let currentUsername;
		let currentPassword;

		if (newValue.username || newValue.username === '') {
			currentUsername = newValue.username;
			currentPassword = password;
		} else if (newValue.password || newValue.password === '') {
			currentPassword = newValue.password;
			currentUsername = username;
		}

		if (currentUsername === '' || currentPassword === '') {
			setFormIsValidStep2(false);
		} else setFormIsValidStep2(true);
	};

	const handleEmailChange = (event) => {
		let input = event.target.value;
		setEmail(input);
		simpleValidationStep1({ email: input });
	};

	const handleUsernameChange = (event) => {
		let input = event.target.value;
		setUsername(input);
		simpleValidationStep2({ username: input });
	};

	const handlePasswordChange = (event) => {
		let input = event.target.value;
		setPassword(input);
		simpleValidationStep2({ password: input });
	};

	const handleSubmit = () => {
		dispatch('SIGN_UP', { email, password });
	};

	const handleContinue = () => {
		setFormStep(2);
	};

	const handleBack = () => {
		setFormStep(1);
	};

	const formStep1 = () => {
		return (
			<>
				<Typography>Sign Up</Typography>
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
					<Button
						onClick={handleContinue}
						variant="contained"
						fullWidth
						disabled={!formIsValidStep1}
						color="primary"
					>
						Continue
					</Button>
				</form>
				<Typography>
					New to Postit?{' '}
					<MaterialUILink component={Link} to="/register">
						Sign Up
					</MaterialUILink>
				</Typography>
			</>
		);
	};

	const formStep2 = () => {
		return (
			<>
				<Typography>Create your username and password</Typography>
				<form>
					<TextField
						id="username"
						label="Username"
						required
						fullWidth
						onChange={handleUsernameChange}
						value={username}
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
					<Button onClick={handleBack}>Back</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						disabled={!formIsValidStep2}
						color="primary"
					>
						Sign Up
					</Button>
				</form>
			</>
		);
	};

	return <Container>{formStep === 1 ? formStep1() : formStep2()}</Container>;
};

export default Register;
