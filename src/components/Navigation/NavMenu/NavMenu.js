import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ForumIcon from '@material-ui/icons/Forum';
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
	const [currentPage, setCurrentPage] = useState('Home');
	const [anchorEl, setAnchorEl] = React.useState(null);

	useEffect(() => {
		if (props.showPathName) {
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
		}
	}, [setCurrentPage, props.showPathName]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const content = [];

	const selectIcon = (name) => {
		switch (name) {
			case 'Home':
				return <HomeIcon />;
			case 'Create Post':
				return <CreateIcon />;
			case 'Log In / Sign Up' || 'Log Out':
				return <ExitToAppIcon />;

			default:
				return <ForumIcon />;
		}
	};

	for (let category in props.items) {
		content.push(
			category.toLocaleUpperCase(),
			props.items[category].map((item) => {
				if (item.name === 'Log In / Sign Up') {
					return (
						<MenuItem onClick={handleClose && props.handleLogin}>
							{selectIcon(item.name)}
							{item.name}
						</MenuItem>
					);
				}
				return (
					<MaterialUILink component={Link} to={item.link}>
						<MenuItem onClick={handleClose}>
							{selectIcon(item.name)}
							{item.name}
						</MenuItem>
					</MaterialUILink>
				);
			})
		);
	}

	const buttonContent = () => {
		if (props.showPathName) {
			return (
				<>
					{selectIcon(currentPage)}
					{currentPage}
				</>
			);
		} else if (props.showUser) {
			return (
				<>
					<PersonIcon />
					{props.userName}
				</>
			);
		}
	};

	return (
		<>
			<Button
				aria-controls="nav-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				{buttonContent()}
				<ExpandMoreIcon />
			</Button>
			<StyledMenu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{content}
			</StyledMenu>
		</>
	);
};

export default NavMenu;
