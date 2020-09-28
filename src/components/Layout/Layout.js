import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import Container from '@material-ui/core/Container';
import MainToolbar from '../../containers/MainToolbar/MainToolbar';
import Dialog from '@material-ui/core/Dialog';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import Spinner from '../UI/Spinner/Spinner';

const Layout = (props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState('login');
	const { isLoggedIn } = useStore()[0];
	const { isLoading } = useStore()[0];

	useEffect(() => {
		if (isLoggedIn && dialogOpen === true) {
			handleDialogClose();
		}
	}, [isLoggedIn, dialogOpen]);

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
					<Dialog open={dialogOpen} onClose={handleDialogClose}>
						{dialogContent === 'login' ? (
							<Login handleSignupDialog={handleSignupDialog} />
						) : (
							<Register handleLoginDialog={handleLoginDialog} />
						)}
					</Dialog>
					<main>
						<Container>{props.children}</Container>
					</main>
				</>
			)}
		</>
	);
};

export default Layout;
