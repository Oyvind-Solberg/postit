import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ForumIcon from '@material-ui/icons/Forum';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

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

const NavButton = withStyles({
	root: {
		width: '17rem',
		display: 'inline-flex',
		justifyContent: 'space-between',
	},
})(Button);

const StyledMenuItem = withStyles({
	root: {
		width: '17rem',
	},
})(MenuItem);

const StyledListSubheader = withStyles({
	root: {
		paddingTop: '0',
		paddingBottom: '0',
	},
})(ListSubheader);

const NavMenu = (props) => {
	const [currentPage, setCurrentPage] = useState('Home');
	const [anchorEl, setAnchorEl] = React.useState(null);

	useEffect(() => {
		let pathName = window.location.pathname;

		switch (pathName) {
			case '/':
				pathName = 'Home';
				break;
			case '/submit':
				pathName = 'Create Post';
				break;

			default:
				break;
		}
		setCurrentPage(pathName);
	}, [setCurrentPage, props.showPathName]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const selectIcon = (name) => {
		switch (name) {
			case 'Home':
				return <HomeIcon color="primary" fontSize="small" />;
			case 'Create Post':
				return <CreateIcon color="primary" fontSize="small" />;

			default:
				return <ForumIcon color="primary" fontSize="small" />;
		}
	};

	const populateItems = (items) => {
		return items.map((item) => {
			return (
				<MaterialUILink key={item} component={Link} to={item.link}>
					<StyledMenuItem onClick={handleClose}>
						<ListItemIcon>{selectIcon(item.name)}</ListItemIcon>
						<ListItemText primary={item.name} />
					</StyledMenuItem>
				</MaterialUILink>
			);
		});
	};

	return (
		<>
			<NavButton
				size="small"
				aria-controls="nav-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<Grid container alignItems="center" component="span">
					<Box component="span" mr={1}>
						<Grid container alignItems="center" component="span">
							{selectIcon(currentPage)}
						</Grid>
					</Box>
					{currentPage}
				</Grid>

				<ExpandMoreIcon />
			</NavButton>
			<StyledMenu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledListSubheader>Postit Feeds</StyledListSubheader>
				{populateItems([{ name: 'Home', link: '/' }])}
				<StyledListSubheader>Other</StyledListSubheader>
				{populateItems([{ name: 'Create Post', link: '/submit' }])}
			</StyledMenu>
		</>
	);
};

export default NavMenu;
