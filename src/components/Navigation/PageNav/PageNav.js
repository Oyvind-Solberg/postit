import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { colorTheme } from '../../../shared/styles/colorTheme';
import { withStyles } from '@material-ui/core/styles';

function IconButtonLink(props) {
	return <IconButton component={Link} {...props}></IconButton>;
}

const StyledAppBar = withStyles({
	root: {
		backgroundColor: colorTheme.primaryDark,
	},
})(AppBar);

const PageNav = (props) => {
	return (
		<>
			<StyledAppBar position="relative" elevation={0}>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Box>
							{props.handleBack && props.formStep === 2 ? (
								<IconButton onClick={props.handleBack}>
									<ArrowBackIcon
										style={{
											color: colorTheme.white,
										}}
									/>
								</IconButton>
							) : (
								<IconButtonLink to="/">
									<ArrowBackIcon
										style={{
											color: colorTheme.white,
										}}
									/>
								</IconButtonLink>
							)}
							<Button component={Link} to="/">
								<Typography variant="h1">
									<Box
										mr={2}
										fontSize="1.92rem"
										fontFamily="'M PLUS Rounded 1c'"
										style={{
											color: colorTheme.white,
										}}
									>
										postit
									</Box>
								</Typography>
							</Button>
						</Box>
						<Box></Box>
					</Grid>
				</Toolbar>
			</StyledAppBar>
		</>
	);
};

export default PageNav;
