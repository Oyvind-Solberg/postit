import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../../../shared/styles/colorTheme';
import Reply from '../../../../containers/Reply/Reply';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Button from '@material-ui/core/Button';
import VotesControls from '../../Controls/VotesControls/VotesControls';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: (props) =>
			props.isTopLevel === true ? '2rem 0 2rem 1.6rem' : '1rem 0 0 0',
		marginLeft: (props) => (props.isTopLevel === true ? '0' : '0rem'),
		[theme.breakpoints.down('sm')]: {
			marginLeft: (props) => (props.isTopLevel === true ? '0' : '1.5rem'),
			borderLeft: (props) =>
				props.isTopLevel === true ? 'none' : `1px solid ${colorTheme.neutral}`,
			borderTop: (props) =>
				props.isTopLevel === true ? `5px solid ${colorTheme.neutral}` : 'none',
			'&:first-child': {
				borderTop: (props) => (props.isTopLevel === true ? `none` : 'none'),
			},
		},
		borderRadius: '0',
	},
	container: {
		display: 'flex',
	},
	cardContent: {
		width: '100%',
		padding: '0',
		'&:last-child': {
			paddingBottom: '0',
		},
	},
	cardGroup: {
		paddingLeft: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
		},
		paddingBottom: '1rem',
	},
	replay: {
		marginRight: theme.spacing(2),
	},
	counter: {
		fontSize: '1.2rem',
		[theme.breakpoints.down('sm')]: {
			color: colorTheme.neutralDark,
		},
	},
	commentButton: {
		fontSize: '1.2rem',
		color: colorTheme.neutralDark,
		textTransform: 'none',
		padding: '.6rem .3rem',
	},
	author: {
		[theme.breakpoints.down('sm')]: {
			fontWeight: 'bold',
		},
	},
	text: {
		paddingRight: '3.2rem',
		marginTop: '1rem',
	},
	altText: {
		color: colorTheme.neutralDark,
	},
	buttonGroup: {
		fontSize: '1.2rem',
		marginTop: '.8rem',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
}));

const Comment = (props) => {
	const classes = useStyles(props);
	const [replyOpen, setReplyOpen] = useState(false);

	const date = new Date(props.createdAt);
	const time =
		('0' + date.getHours()).slice(-2) +
		':' +
		('0' + date.getMinutes()).slice(-2);

	const handleToggleReply = () => {
		if (replyOpen) {
			setReplyOpen(false);
		} else {
			setReplyOpen(true);
		}
	};

	let voteCollection = {
		name: 'comments',
		norwegianName: 'kommentar',
		field: 'points',
	};

	return (
		<Card className={classes.root} elevation={0} key={props.id}>
			<div className={classes.container}>
				<Hidden smDown>
					<VotesControls
						id={props.id}
						voteCollection={voteCollection}
						handleUpVote={props.handleUpVote}
						handleDownVote={props.handleDownVote}
						isComment
						postIsOpen
					></VotesControls>
				</Hidden>
				<CardContent className={classes.cardContent}>
					<div className={classes.cardGroup}>
						<Typography variant="caption" component="p">
							<span className={classes.author}>{props.author} </span>
							<span className={classes.altText}>
								<Hidden smDown className={classes.hiddenSmDown}>
									{props.points} poeng{' '}
								</Hidden>
								- {date.toDateString()}, {time}
							</span>
						</Typography>
						<Typography className={classes.text} variant="body1">
							{props.text}
						</Typography>

						<div className={classes.replay}>
							<div className={classes.buttonGroup}>
								<Hidden mdUp>
									<VotesControls
										id={props.id}
										voteCollection={voteCollection}
										handleUpVote={props.handleUpVote}
										handleDownVote={props.handleDownVote}
										isComment
										postIsOpen
										mobile
									>
										<span className={classes.counter}>{props.points}</span>
									</VotesControls>
								</Hidden>
								{props.isLoggedIn ? (
									<Button
										className={classes.commentButton}
										onClick={handleToggleReply}
										startIcon={<ModeCommentIcon />}
									>
										Kommenter
									</Button>
								) : null}
							</div>
							{replyOpen ? (
								<Reply
									parent={props.id}
									post={props.post}
									setReplyOpen={setReplyOpen}
									handleToggleReply={handleToggleReply}
								/>
							) : null}
						</div>
					</div>
					{props.children}
				</CardContent>
			</div>
		</Card>
	);
};

export default Comment;
