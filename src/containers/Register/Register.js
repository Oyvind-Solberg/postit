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
import { checkValidity } from '../../shared/utility';

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
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [username, setUsername] = useState('');
	const [usernameIsValid, setUsernameIsValid] = useState(false);
	const [usernameTouched, setUsernameTouched] = useState(false);
	const [formIsValidStep1, setFormIsValidStep1] = useState(false);
	const [formIsValidStep2, setFormIsValidStep2] = useState(false);
	const [formStep, setFormStep] = useState(1);

	const asyncDispatch = useStore(false)[1];
	const dispatch = useStore(false)[2];
	const { isLoggedIn } = useStore()[0];

	const checkFormValidity = (username, password) => {
		if (username && password) {
			setFormIsValidStep2(true);
		} else {
			setFormIsValidStep2(false);
		}
	};

	const handleEmailChange = (event) => {
		let input = event.target.value;
		setEmail(input);
		const isValid = checkValidity(input, { isEmail: true });
		setEmailIsValid(isValid);

		if (isValid) {
			setFormIsValidStep1(true);
		} else {
			setFormIsValidStep1(false);
		}
		if (!emailTouched) {
			setEmailTouched(true);
		}
	};

	const handleUsernameChange = (event) => {
		let input = event.target.value;
		setUsername(input);
		const isValid = checkValidity(input, { minLength: 5, maxLength: 32 });
		setUsernameIsValid(isValid);
		checkFormValidity(isValid, passwordIsValid);

		if (!usernameTouched) {
			setUsernameTouched(true);
		}
	};

	const handlePasswordChange = (event) => {
		let input = event.target.value;
		setPassword(input);
		const isValid = checkValidity(input, { minLength: 5, maxLength: 32 });
		setPasswordIsValid(isValid);
		checkFormValidity(usernameIsValid, isValid);

		if (!passwordTouched) {
			setPasswordTouched(true);
		}
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
						error={!emailIsValid && emailTouched}
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
						error={!usernameIsValid && usernameTouched}
						helperText="Username must be at least 5 characters long"
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
							error={!passwordIsValid && passwordTouched}
							helperText="Password must be at least 5 characters long"
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
