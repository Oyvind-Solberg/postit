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
				<ListSubheader>Settings</ListSubheader>
				<ListItemLink to={props.isLoggedIn ? '/logout' : '/login'}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText
						primary={props.isLoggedIn ? 'Log Out' : 'Log In / Sign Up'}
					/>
				</ListItemLink>
			</List>
		</div>
	);

	return (
		<>
			<IconButton aria-label="menu" onClick={handleDrawerOpen}>
				<MenuIcon />
			</IconButton>
			<Drawer open={isDrawerOpen} onClose={handleDrawerClose} anchor="top">
				{content}
			</Drawer>
		</>
	);
};

export default MobileDrawer;
