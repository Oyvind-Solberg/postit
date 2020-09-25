import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Logo from '../../Logo/Logo';

function IconButtonLink(props) {
	return <IconButton component={Link} {...props}></IconButton>;
}

const PageNav = (props) => {
	return (
		<>
			<AppBar position="static" elevation={0}>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Box>
							{props.handleBack && props.formStep === 2 ? (
								<IconButton onClick={props.handleBack}>
									<ArrowBackIcon />
								</IconButton>
							) : (
								<IconButtonLink to="/">
									<ArrowBackIcon />
								</IconButtonLink>
							)}
							<IconButtonLink to="#">
								<Logo />
							</IconButtonLink>
						</Box>
						<Box></Box>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default PageNav;
