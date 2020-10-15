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
import { withStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../../shared/styles/colorTheme';

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
				pathName = 'Hjem';
				break;
			case '/submit':
				pathName = 'Nytt Innlegg';
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
			case 'Hjem':
				return <HomeIcon color="primary" fontSize="small" />;
			case 'Nytt Innlegg':
				return <CreateIcon color="primary" fontSize="small" />;

			default:
				return <ForumIcon color="primary" fontSize="small" />;
		}
	};

	const populateItems = (items) => {
		return items.map((item) => {
			return (
				<StyledMenuItem
					key={item}
					component={Link}
					to={item.link}
					onClick={handleClose}
				>
					<ListItemIcon>{selectIcon(item.name)}</ListItemIcon>
					<StyledListItemText primary={item.name} />
				</StyledMenuItem>
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
				{populateItems([{ name: 'Hjem', link: '/' }])}

				<StyledListSubheader>Annet</StyledListSubheader>

				{populateItems([{ name: 'Nytt Innlegg', link: '/submit' }])}
			</StyledMenu>
		</>
	);
};

export default NavMenu;
