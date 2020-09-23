import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const NavMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const selectIcon = (name) => {
		switch (name) {
			case 'Log In / Sign Up':
				return <ExitToAppIcon />;
			case 'Log Out':
				return <ExitToAppIcon />;

			default:
				return null;
		}
	};

	const populateItems = (items) => {
		return items.map((item) => {
			return (
				<MaterialUILink key={item} component={Link} to={item.link}>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>{selectIcon(item.name)}</ListItemIcon>
						<ListItemText primary={item.name} />
					</MenuItem>
				</MaterialUILink>
			);
		});
	};

	return (
		<>
			<Button
				aria-controls="nav-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<PersonIcon />
				{props.userName}
				<ExpandMoreIcon />
			</Button>
			<StyledMenu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<div onClick={handleClose}>
					<ListSubheader>More Stuff</ListSubheader>
					{props.isLoggedIn ? (
						populateItems([{ name: 'Log Out', link: '/logout' }])
					) : (
						<MenuItem onClick={props.handleLogin}>
							<ListItemIcon>{selectIcon('Log In / Sign Up')}</ListItemIcon>
							<ListItemText primary={'Log In / Sign Up'} />
						</MenuItem>
					)}
				</div>
			</StyledMenu>
		</>
	);
};

export default NavMenu;
