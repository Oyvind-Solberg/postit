import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import MainToolbar from '../../containers/MainToolbar/MainToolbar';
import Dialog from '@material-ui/core/Dialog';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';

const Layout = (props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState('login');

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleLogin = () => {
		setDialogOpen(true);
		setDialogContent('login');
	};

	const handleSignup = () => {
		setDialogOpen(true);
		setDialogContent('signup');
	};

	return (
		<>
			<header>
				<MainToolbar handleLogin={handleLogin} handleSignup={handleSignup} />
			</header>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				{dialogContent === 'login' ? <Login /> : <Register />}
			</Dialog>
			<main>
				<Container>{props.children}</Container>
			</main>
		</>
	);
};

export default Layout;
