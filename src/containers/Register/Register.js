import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import { useStore } from '../../store/store';
import Hidden from '@material-ui/core/Hidden';
import PageNav from '../../components/Navigation/PageNav/PageNav';
import Box from '@material-ui/core/Box';
import { checkValidity } from '../../shared/utility';
import Container from '../../components/Layout/Container/Container';
import BackgroundOverlay from '../../components/Layout/BackgroundOverlay/BackgroundOverlay';

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
		const isValid = checkValidity(input, { minLength: 4, maxLength: 32 });
		setUsernameIsValid(isValid);
		checkFormValidity(isValid, passwordIsValid);

		if (!usernameTouched) {
			setUsernameTouched(true);
		}
	};

	const handlePasswordChange = (event) => {
		let input = event.target.value;
		setPassword(input);
		const isValid = checkValidity(input, { minLength: 8, maxLength: 32 });
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
						Registrer Deg
					</Typography>
				</Box>
				<form>
					<TextField
						id="email"
						label="Epost"
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
							Fortsett
						</Button>
					</Box>
				</form>
				<Typography>
					Allerede en postitor?
					<Hidden mdUp>
						<Box component="span" ml={1}>
							<MaterialUILink component={Link} to="/login">
								Logg Inn
							</MaterialUILink>
						</Box>
					</Hidden>
					<Hidden smDown>
						<Button color="primary" onClick={props.handleLoginDialog}>
							Logg Inn
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
						Opprett brukernavn og passord
					</Typography>
				</Box>
				<form>
					<TextField
						id="username"
						label="Brukernavn"
						variant="filled"
						required
						fullWidth
						onChange={handleUsernameChange}
						value={username}
						size="small"
						error={!usernameIsValid && usernameTouched}
						helperText="Brukernavnet må være på minst 4 tegn"
					/>

					<Box mt={2} mb={6}>
						<TextField
							id="password"
							label="Passord"
							variant="filled"
							required
							type="password"
							fullWidth
							onChange={handlePasswordChange}
							value={password}
							size="small"
							error={!passwordIsValid && passwordTouched}
							helperText="Passordet må være på minst 8 tegn"
						/>
					</Box>
					<Hidden smDown>
						<Box mb={1}>
							<Button fullWidth onClick={handleBack}>
								Tilbake
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
						Registrer Deg
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
				<BackgroundOverlay />
			</Hidden>
			<Container>{formStep === 1 ? formStep1() : formStep2()}</Container>
		</>
	);
};

export default Register;
