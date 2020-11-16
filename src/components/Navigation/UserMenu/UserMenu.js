import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../../shared/styles/colorTheme';
import Box from '@material-ui/core/Box';

const StyledListItemText = withStyles({
	primary: {
		color: colorTheme.black,
	},
})(ListItemText);

const StyledMenu = withStyles({
	paper: {
		border: '1px solid lightgrey',
		borderTop: 'none',
		borderTopLeftRadius: '0',
		borderTopRightRadius: '0',
	},
})((props) => (
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

const StyledListSubheader = withStyles({
	root: {
		paddingTop: '0',
		paddingBottom: '0',
	},
})(ListSubheader);

const StyledMenuItem = withStyles({
	root: {
		width: '27.2rem',
	},
})(MenuItem);

const NavMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-controls="nav-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<PersonIcon />
				<Box component="span" mx={1}>
					{props.username}
				</Box>
				<ExpandMoreIcon />
			</Button>
			<StyledMenu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				style={{ zIndex: 3000 }}
			>
				{props.isLoggedIn ? (
					<StyledMenuItem component={Link} to="/logout" onClick={handleClose}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<StyledListItemText primary="Logg Ut" />
					</StyledMenuItem>
				) : (
					<StyledMenuItem
						onClick={() => {
							handleClose();
							props.handleLogin();
						}}
					>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary={'Logg Inn / Registrer Deg'} />
					</StyledMenuItem>
				)}
			</StyledMenu>
		</>
	);
};

export default NavMenu;
