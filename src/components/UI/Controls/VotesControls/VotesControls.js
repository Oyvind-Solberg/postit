import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import { colorTheme } from '../../../../shared/styles/colorTheme';

const useStyles = makeStyles((theme) => ({
	votesControls: {
		display: (props) => (props.mobile === true ? 'inline-flex' : 'flex'),
		flexDirection: (props) => (props.mobile === true ? 'row' : 'column'),
		justifyContent: 'start',
		alignItems: 'center',
		marginRight: (props) => (props.mobile === true ? '1rem' : '0'),
	},
	threadLine: {
		display: 'block',
		borderRight: '2px solid',
		borderRightColor: colorTheme.neutral,
		height: '100%',
		marginTop: '.8rem',
	},
	iconButton: {
		padding: '0',
	},
	icon: {
		fontSize: '2rem',
	},
	counter: {
		padding: '0 .3rem',
	},
}));

const VotesControls = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.votesControls}>
			<IconButton
				className={classes.iconButton}
				size="small"
				onClick={() => {
					props.handleUpVote(props.id, props.voteCollection);
				}}
			>
				<ArrowUpwardIcon className={classes.icon} />
			</IconButton>
			<span className={classes.counter}>{props.children}</span>
			<IconButton
				className={classes.iconButton}
				size="small"
				onClick={() => {
					props.handleDownVote(props.id, props.voteCollection);
				}}
			>
				<ArrowDownwardIcon className={classes.icon} />
			</IconButton>
			{props.isComment ? <div className={classes.threadLine}></div> : null}
		</div>
	);
};

export default VotesControls;
