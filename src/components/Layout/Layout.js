import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import Container from '@material-ui/core/Container';
import MainToolbar from '../../containers/MainToolbar/MainToolbar';
import Dialog from '@material-ui/core/Dialog';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import Spinner from '../UI/Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../shared/styles/colorTheme';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	// backgroundOverlay: (props) =>
	// 	props.backgroundWhite
	// 		? {
	// 				position: 'absolute',
	// 				top: '0',
	// 				left: '0',
	// 				backgroundColor: colorTheme.white,
	// 				height: '100vh',
	// 				width: '100vw',
	// 		  }
	// 		: {},
	main: {
		marginTop: '6.4rem',
		[theme.breakpoints.down('xs')]: {
			marginTop: '5.6rem',
		},
		padding: '2.4rem 0 2.4rem 0',
		[theme.breakpoints.down('sm')]: {
			padding: '0.3rem 0 0.3rem 0',
		},
	},
	container: {
		[theme.breakpoints.down('sm')]: {
			padding: '0',
		},
	},
}));

const StyledDialog = withStyles({
	paper: {
		height: '40rem',
	},
})(Dialog);

const Layout = (props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState('login');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const { isLoggedIn } = useStore()[0];
	const { isLoading } = useStore()[0];
	const { message } = useStore()[0];
	const { showMessage } = useStore()[0];
	const dispatch = useStore(false)[2];
	const classes = useStyles(props);

	useEffect(() => {
		if (isLoggedIn && dialogOpen === true) {
			handleDialogClose();
		}
	}, [isLoggedIn, dialogOpen]);

	useEffect(() => {
		if (showMessage) {
			setSnackbarOpen(true);
			dispatch('SET_SHOW_MESSAGE', false);
		}
	}, [showMessage, dispatch]);

	const handleSnacbarClose = () => {
		setSnackbarOpen(false);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleLoginDialog = () => {
		if (!dialogOpen) setDialogOpen(true);
		setDialogContent('login');
	};

	const handleSignupDialog = () => {
		if (!dialogOpen) setDialogOpen(true);
		setDialogContent('signup');
	};

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				// <div className={classes.backgroundOverlay}>
				<>
					<header>
						<MainToolbar
							handleLogin={handleLoginDialog}
							handleSignup={handleSignupDialog}
						/>
					</header>
					<Snackbar
						open={snackbarOpen}
						autoHideDuration={6000}
						onClose={handleSnacbarClose}
					>
						<Alert
							elevation={10}
							onClose={handleSnacbarClose}
							severity={message.severity}
						>
							{message.text}
						</Alert>
					</Snackbar>

					<StyledDialog fullWidth open={dialogOpen} onClose={handleDialogClose}>
						{dialogContent === 'login' ? (
							<Login handleSignupDialog={handleSignupDialog} />
						) : (
							<Register handleLoginDialog={handleLoginDialog} />
						)}
					</StyledDialog>
					<main className={classes.main}>
						<Container className={classes.container} maxWidth="md">
							{props.children}
						</Container>
					</main>
				</>
				// </div>
			)}
		</>
	);
};

export default Layout;
