import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import styled from 'styled-components';
import { useStore } from '../../store/store';
import Hidden from '@material-ui/core/Hidden';
import PageNav from '../../components/Navigation/PageNav/PageNav';
import Box from '@material-ui/core/Box';

const Container = styled.div`
	height: 100%;
	overflow: hidden;
	background-color: white;
	padding: 2rem;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

const Register = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [formIsValidStep1, setFormIsValidStep1] = useState(false);
	const [formIsValidStep2, setFormIsValidStep2] = useState(false);
	const [formStep, setFormStep] = useState(1);

	const asyncDispatch = useStore(false)[1];
	const dispatch = useStore(false)[2];
	const { isLoggedIn } = useStore()[0];

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
		asyncDispatch('SIGN_UP', { email, password, username });
		dispatch('SET_IS_LOADING', true);
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
				<Box mb={3}>
					<Typography variant="h6" component="h2">
						Sign Up
					</Typography>
				</Box>
				<form>
					<TextField
						id="email"
						label="Email"
						type="email"
						variant="filled"
						size="small"
						required
						fullWidth
						onChange={handleEmailChange}
						value={email}
					/>
					<Box my={2}>
						<Button
							onClick={handleContinue}
							variant="contained"
							fullWidth
							disabled={!formIsValidStep1}
							color="primary"
							size="large"
						>
							Continue
						</Button>
					</Box>
				</form>
				<Typography>
					Already a postitor?
					<Hidden mdUp>
						<Box component="span" ml={1}>
							<MaterialUILink component={Link} to="/login">
								Log In
							</MaterialUILink>
						</Box>
					</Hidden>
					<Hidden smDown>
						<Button color="primary" onClick={props.handleLoginDialog}>
							Log In
						</Button>
					</Hidden>
				</Typography>
			</>
		);
	};

	const formStep2 = () => {
		return (
			<>
				<Box mb={3}>
					<Typography variant="h6" component="h2">
						Create your username and password
					</Typography>
				</Box>
				<form>
					<TextField
						id="username"
						label="Username"
						variant="filled"
						required
						fullWidth
						onChange={handleUsernameChange}
						value={username}
						size="small"
					/>

					<Box mt={2} mb={6}>
						<TextField
							id="password"
							label="Password"
							variant="filled"
							required
							type="password"
							fullWidth
							onChange={handlePasswordChange}
							value={password}
							size="small"
						/>
					</Box>
					<Hidden smDown>
						<Box mb={1}>
							<Button fullWidth onClick={handleBack}>
								Back
							</Button>
						</Box>
					</Hidden>

					<Button
						onClick={handleSubmit}
						variant="contained"
						disabled={!formIsValidStep2}
						color="primary"
						fullWidth
						size="large"
					>
						Sign Up
					</Button>
				</form>
			</>
		);
	};

	return (
		<>
			{isLoggedIn ? <Redirect to="/" /> : null}
			<Hidden mdUp>
				<PageNav handleBack={handleBack} formStep={formStep} />
			</Hidden>
			<Container>{formStep === 1 ? formStep1() : formStep2()}</Container>
		</>
	);
};

export default Register;
