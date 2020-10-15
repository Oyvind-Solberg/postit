import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import Container from '@material-ui/core/Container';
import MainToolbar from '../../containers/MainToolbar/MainToolbar';
import Dialog from '@material-ui/core/Dialog';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import Spinner from '../UI/Spinner/Spinner';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../shared/styles/colorTheme';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const StyledDialog = withStyles({
	paper: {
		height: '25rem',
	},
})(Dialog);

const StyledMain = styled.main`
	padding: 5.5rem 0 1.5rem 0;
	background-color: ${colorTheme.neutral};
	min-height: 100vh;
`;

const Layout = (props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState('login');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const { isLoggedIn } = useStore()[0];
	const { isLoading } = useStore()[0];
	const { message } = useStore()[0];
	const { showMessage } = useStore()[0];
	const dispatch = useStore(false)[2];

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
					<StyledMain>
						<Container maxWidth="md">{props.children}</Container>
					</StyledMain>
				</>
			)}
		</>
	);
};

export default Layout;
