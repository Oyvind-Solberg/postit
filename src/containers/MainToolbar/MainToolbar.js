import React from 'react';
import { useStore } from '../../store/store';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import { colorTheme } from '../../shared/styles/colorTheme';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import NavMenu from '../../components/Navigation/NavMenu/NavMenu';
import UserMenu from '../../components/Navigation/UserMenu/UserMenu';
import MobileDrawer from '../../components/Navigation/MobileDrawer/MobileDrawer';
import Logo from '../../components/Logo/Logo';

function IconButtonLink(props) {
	return <IconButton component={Link} {...props}></IconButton>;
}

const MainToolbar = (props) => {
	const { isLoggedIn } = useStore()[0];

	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				style={{ backgroundColor: colorTheme.white, color: colorTheme.black }}
			>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Box>
							<IconButtonLink to="/">
								<Logo />
							</IconButtonLink>
							{/* <MaterialUILink component={Link} to="/"></MaterialUILink> */}
							<Hidden smDown>{isLoggedIn ? <NavMenu /> : null}</Hidden>
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
							<Hidden smDown>
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

								<UserMenu
									handleLogin={props.handleLogin}
									isLoggedIn={isLoggedIn}
								/>
							</Hidden>
							<Hidden mdUp>
								<MobileDrawer
									handleLogin={props.handleLogin}
									isLoggedIn={isLoggedIn}
								/>
							</Hidden>
						</Box>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default MainToolbar;
