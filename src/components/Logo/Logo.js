import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';

function LogoIcon(props) {
	return (
		<SvgIcon {...props}>
			<svg width="24" height="24" x="0" y="0" viewBox="0 0 27.403 27.403">
				<g>
					<path d="M27.403,15.759c0-2.941-1.494-5.534-3.767-7.061c0.303,1.086,0.477,2.225,0.477,3.405c0,5.274-3.217,9.811-7.79,11.753    c0.813,0.259,1.681,0.4,2.58,0.4c0.724,0,1.422-0.101,2.091-0.271l4.038,2.665l-0.284-4.733    C26.381,20.37,27.403,18.185,27.403,15.759z" />
					<path d="M22.703,12.103c0-6.27-5.081-11.352-11.351-11.352S0,5.833,0,12.103c0,3.242,1.366,6.16,3.547,8.228l-0.38,6.321    l5.392-3.56c0.895,0.228,1.827,0.36,2.793,0.36C17.622,23.454,22.703,18.371,22.703,12.103z M4.629,10.36    c0-1.125,0.912-2.036,2.037-2.036s2.037,0.911,2.037,2.036c0,1.126-0.912,2.038-2.037,2.038S4.629,11.486,4.629,10.36z     M11.352,19.765c-3.135,0-5.676-2.486-5.676-3.918c0-1.434,2.541,0.061,5.676,0.061c3.136,0,5.676-1.493,5.676-0.061    C17.028,17.278,14.488,19.765,11.352,19.765z M16.039,12.398c-1.125,0-2.038-0.912-2.038-2.038c0-1.125,0.913-2.036,2.038-2.036    s2.036,0.911,2.036,2.036C18.075,11.486,17.164,12.398,16.039,12.398z" />
				</g>
			</svg>
		</SvgIcon>
	);
}

const Logo = (props) => {
	return (
		<>
			<ListItem component="span">
				<ListItemIcon>
					<LogoIcon style={{ color: 'black' }} />
				</ListItemIcon>

				<Hidden mdDown>
					<ListItemText primary="postit" />
				</Hidden>
			</ListItem>
		</>
	);
};

export default Logo;
