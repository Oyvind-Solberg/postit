import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
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
				return <HomeIcon />;
			case 'Create Post':
				return <CreateIcon />;

			default:
				return <ForumIcon />;
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
				{selectIcon(currentPage)}
				{currentPage}
				<ExpandMoreIcon />
			</Button>
			<StyledMenu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<ListSubheader>Postit Feeds</ListSubheader>
				{populateItems([{ name: 'Home', link: '/' }])}
				<ListSubheader>Other</ListSubheader>
				{populateItems([{ name: 'Create Post', link: '/submit' }])}
			</StyledMenu>
		</>
	);
};

export default NavMenu;
