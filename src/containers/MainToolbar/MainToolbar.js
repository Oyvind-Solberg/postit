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
import { withStyles } from '@material-ui/core/styles';

import NavMenu from '../../components/Navigation/NavMenu/NavMenu';
import UserMenu from '../../components/Navigation/UserMenu/UserMenu';
import MobileDrawer from '../../components/Navigation/MobileDrawer/MobileDrawer';
import Typography from '@material-ui/core/Typography';

const StyledIconButton = withStyles({
	root: {
		borderRadius: '0',
	},
})(IconButton);

function IconButtonLink(props) {
	return <StyledIconButton component={Link} {...props}></StyledIconButton>;
}

const StyledAppBar = withStyles({
	root: {
		backgroundColor: colorTheme.white,
	},
})(AppBar);

const MainToolbar = (props) => {
	const { isLoggedIn } = useStore()[0];

	return (
		<>
			<StyledAppBar position="static" elevation={0}>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Box>
							<Button component={Link} to="/">
								<Typography variant="h1">
									<Box
										mr={2}
										fontSize="1.2rem"
										fontFamily="'M PLUS Rounded 1c'"
									>
										postit
									</Box>
								</Typography>
							</Button>
							<Hidden smDown>{isLoggedIn ? <NavMenu /> : null}</Hidden>
						</Box>
						<Box>
							{isLoggedIn ? (
								<StyledIconButton
									aria-label="create post"
									component={Link}
									to="/submit"
								>
									<CreateIcon />
								</StyledIconButton>
							) : null}
							<Hidden smDown>
								{!isLoggedIn ? (
									<>
										<Button
											color="primary"
											variant="outlined"
											size="small"
											onClick={props.handleLogin}
										>
											Log Inn
										</Button>
										<Box component="span" mx={1}>
											<Button
												color="primary"
												variant="contained"
												size="small"
												onClick={props.handleSignup}
											>
												Sign Up
											</Button>
										</Box>
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
			</StyledAppBar>
		</>
	);
};

export default MainToolbar;
