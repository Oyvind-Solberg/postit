import React from 'react';
import { useStore } from '../../store/store';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { colorTheme } from '../../shared/styles/colorTheme';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import NavMenu from '../../components/Navigation/NavMenu/NavMenu';
import Logo from '../../components/Logo/Logo';

const MainToolbar = (props) => {
	const { isLoggedIn } = useStore()[0];

	const navMenuItems = {
		'postit feeds': [{ name: 'Home', link: '/' }],
		other: [{ name: 'Create Post', link: '/submit' }],
	};

	let userMenuItems = null;
	if (isLoggedIn) {
		userMenuItems = {
			'more stuff': [{ name: 'Log Out', link: '/logout' }],
		};
	} else {
		userMenuItems = {
			'more stuff': [{ name: 'Log In / Sign Up', link: '/login' }],
		};
	}

	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				style={{ backgroundColor: colorTheme.white, color: colorTheme.black }}
			>
				<Toolbar>
					<Grid container justify="space-between">
						<Box>
							<MaterialUILink component={Link} to="/">
								<Logo />
							</MaterialUILink>

							{isLoggedIn ? (
								<NavMenu showPathName items={navMenuItems} coloredIcons />
							) : null}
						</Box>
						<Box>
							{isLoggedIn ? (
								<IconButton
									aria-label="create post"
									component={Link}
									to="/submit"
								>
									<CreateIcon />
								</IconButton>
							) : null}

							{!isLoggedIn ? (
								<>
									<Button variant="contained" onClick={props.handleLogin}>
										Log Inn
									</Button>
									<Button variant="contained" onClick={props.handleSignup}>
										Sign Up
									</Button>
								</>
							) : null}

							<NavMenu
								showUser
								items={userMenuItems}
								handleLogin={props.handleLogin}
							/>
						</Box>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default MainToolbar;
