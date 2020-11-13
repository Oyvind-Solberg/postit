import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import { useStore } from '../../store/store';
import PageNav from '../../components/Navigation/PageNav/PageNav';
import Box from '@material-ui/core/Box';
import { checkValidity } from '../../shared/utility';
import Container from '../../components/Layout/Container/Container';
import BackgroundOverlay from '../../components/Layout/BackgroundOverlay/BackgroundOverlay';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	const asynchDispatch = useStore(false)[1];
	const dispatch = useStore(false)[2];
	const { isLoggedIn } = useStore()[0];

	const checkFormValidity = (email, password) => {
		if (email && password) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	};

	const handleEmailChange = (event) => {
		let input = event.target.value;
		setEmail(input);
		const isValid = checkValidity(input, { isEmail: true });
		setEmailIsValid(isValid);
		checkFormValidity(isValid, passwordIsValid);
		if (!emailTouched) {
			setEmailTouched(true);
		}
	};

	const handlePasswordChange = (event) => {
		let input = event.target.value;
		setPassword(input);
		const isValid = checkValidity(input, { minLength: 5, maxLength: 32 });
		setPasswordIsValid(isValid);
		checkFormValidity(emailIsValid, isValid);
		if (!passwordTouched) {
			setPasswordTouched(true);
		}
	};

	const handleSubmit = () => {
		asynchDispatch('LOG_IN', { email, password });
		dispatch('SET_IS_LOADING', true);
	};

	return (
		<>
			{isLoggedIn ? <Redirect to="/" /> : null}

			<Hidden mdUp>
				<PageNav />
				<BackgroundOverlay />
			</Hidden>
			<Container>
				<Box mb={3}>
					<Typography variant="h6" component="h2">
						Logg Inn
					</Typography>
				</Box>
				<form>
					<TextField
						id="email"
						label="Epost"
						type="email"
						variant="filled"
						required
						fullWidth
						size="small"
						onChange={handleEmailChange}
						value={email}
						error={!emailIsValid && emailTouched}
					/>
					<Box mt={2} mb={6}>
						<TextField
							id="password"
							label="Passord"
							variant="filled"
							required
							type="password"
							fullWidth
							size="small"
							onChange={handlePasswordChange}
							value={password}
							error={!passwordIsValid && passwordTouched}
						/>
					</Box>
					<Button
						onClick={handleSubmit}
						variant="contained"
						fullWidth
						disabled={!formIsValid}
						size="large"
						color="primary"
					>
						Logg Inn
					</Button>
				</form>
				<Box mt={2}>
					<Typography>
						Ny til Postit?
						<Hidden mdUp>
							<Box component="span" ml={1}>
								<MaterialUILink component={Link} to="/register">
									Registrer deg
								</MaterialUILink>
							</Box>
						</Hidden>
						<Hidden smDown>
							<Button color="primary" onClick={props.handleSignupDialog}>
								Registrer deg
							</Button>
						</Hidden>
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default Login;
