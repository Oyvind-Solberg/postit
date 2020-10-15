import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { colorTheme } from '../../../shared/styles/colorTheme';
import { withStyles } from '@material-ui/core/styles';

const StyledDrawer = withStyles({
	paper: {
		backgroundColor: colorTheme.primaryDark,
		color: colorTheme.white,
	},
})(Drawer);

function ListItemLink(props) {
	return <ListItem button component={Link} {...props} />;
}

const MobileDrawer = (props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const content = (
		<div
			role="presentation"
			onClick={handleDrawerClose}
			onKeyDown={handleDrawerClose}
		>
			<List>
				<ListSubheader style={{ color: colorTheme.white }}>
					Innstillinger
				</ListSubheader>
				<ListItemLink to={props.isLoggedIn ? '/logout' : '/login'}>
					<ListItemIcon>
						<ExitToAppIcon style={{ color: colorTheme.white }} />
					</ListItemIcon>
					<ListItemText
						primary={props.isLoggedIn ? 'Logg Ut' : 'Logg Inn / Registrer Deg'}
					/>
				</ListItemLink>
			</List>
		</div>
	);

	return (
		<>
			<IconButton aria-label="menu" onClick={handleDrawerOpen}>
				<MenuIcon style={{ color: colorTheme.white }} />
			</IconButton>
			<StyledDrawer
				open={isDrawerOpen}
				onClose={handleDrawerClose}
				anchor="top"
			>
				{content}
			</StyledDrawer>
		</>
	);
};

export default MobileDrawer;
