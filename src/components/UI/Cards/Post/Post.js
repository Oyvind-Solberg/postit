import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { colorTheme } from '../../../../shared/styles/colorTheme';
import Reply from '../../../../containers/Reply/Reply';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import VotesControls from '../../Controls/VotesControls/VotesControls';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		borderTopRightRadius: (props) =>
			props.postIsOpen === true ? '20px' : '4px',
		borderTopLeftRadius: (props) =>
			props.postIsOpen === true ? '20px' : '4px',
		borderBottomLeftRadius: (props) => (props.hasComments ? '0' : '4px'),
		borderBottomRightRadius: (props) => (props.hasComments ? '0' : '4px'),
		marginTop: (props) => (props.postIsOpen === true ? '0' : '1.28rem'),
		[theme.breakpoints.down('sm')]: {
			marginTop: (props) => (props.postIsOpen === true ? '0' : '0.3rem'),
		},
		'&:first-child': {
			marginTop: '0',
		},
	},
	header: {
		width: '100%',
		display: 'flex',
		padding: '1rem 1rem 0 1rem',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	container: {
		display: 'flex',
	},
	votesControls: {
		backgroundColor: (props) =>
			props.postIsOpen === true ? colorTheme.white : colorTheme.neutralLight,
		padding: '1.2rem 0rem 0.8rem 0rem',
		width: '4rem',
	},
	counter: {
		fontSize: '1.4rem',
		fontWeight: 'bold',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			fontWeight: '500',
			color: colorTheme.neutralDark,
		},
	},
	content: {
		padding: '1.2rem 2rem 1.2rem .9rem',
		[theme.breakpoints.down('sm')]: {
			padding: '1.2rem 1.8rem 1.2rem 1.8rem',
		},
		'&:last-child': {
			paddingBottom: '1.2rem',
		},
		width: '100%',
		'&:hover': {
			cursor: (props) => (props.postIsOpen === true ? 'auto' : 'pointer'),
		},
	},
	children: {
		paddingBottom: (props) => (props.postIsOpen === true ? '2.4rem' : '0'),
	},
	title: {
		marginTop: '.2rem',
	},
	text: {
		marginTop: '.8rem',
	},
	subText: {
		// marginTop: '4.48rem',
	},
	altText: {
		color: colorTheme.neutralDark,
	},
	author: {
		[theme.breakpoints.down('sm')]: {
			fontWeight: 'bold',
		},
	},
	buttonGroup: {
		marginTop: (props) => (props.postIsOpen === true ? '1.8rem' : '1.2rem'),
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: (props) => (props.postIsOpen === true ? '1rem' : '0'),
	},
	commentIcon: {
		color: colorTheme.neutralDark,
	},
	iconText: {
		color: colorTheme.neutralDark,
		fontSize: '1.2rem',
		fontWeight: '500',
		textTransform: 'none',
		letterSpacing: 'normal',
		paddingLeft: '.5rem',
	},
	toggleReplay: {
		'& .MuiCardContent-root': {
			padding: '0',
		},
	},
}));

const Post = (props) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const [replyOpen, setReplyOpen] = useState(false);
	const classes = useStyles(props);
	const date = new Date(props.createdAt);
	const time =
		('0' + date.getHours()).slice(-2) +
		':' +
		('0' + date.getMinutes()).slice(-2);

	let voteCollection = {
		name: 'posts',
		norwegianName: 'innlegg',
		field: 'votes',
	};

	const handleToggleReply = () => {
		if (replyOpen) {
			setReplyOpen(false);
		} else {
			setReplyOpen(true);
		}
	};

	const textContent = !props.postIsOpen ? (
		<Hidden smDown>
			<Typography className={classes.text} variant="body1">
				{props.text}
			</Typography>
		</Hidden>
	) : (
		<Typography className={classes.text} variant="body1">
			{props.text}
		</Typography>
	);

	return (
		<Card
			className={classes.root}
			elevation={props.postIsOpen ? 0 : 7}
			key={props.id}
		>
			{props.postIsOpen ? (
				<div className={classes.header}>
					<IconButton size="small" onClick={props.handleModalClose}>
						<CloseIcon />
					</IconButton>
				</div>
			) : null}
			<div className={classes.container}>
				<Hidden smDown>
					<div className={classes.votesControls}>
						<VotesControls
							id={props.id}
							voteCollection={voteCollection}
							handleUpVote={props.handleUpVote}
							handleDownVote={props.handleDownVote}
							postIsOpen={props.postIsOpen}
						>
							<span className={classes.counter}>{props.votes}</span>
						</VotesControls>
					</div>
				</Hidden>
				<CardContent
					className={classes.content}
					onClick={() =>
						props.postIsOpen ? null : props.handleOpenPost(props.id)
					}
				>
					<Typography variant="caption" component="p">
						<span className={classes.author}>
							<Hidden smDown>Publisert av </Hidden>
							{props.author}
						</span>{' '}
						-{' '}
						<span className={classes.altText}>
							{date.toDateString()}, {time}
						</span>
					</Typography>
					<Typography className={classes.title} variant="h6" component="h2">
						{props.title}
					</Typography>
					{props.text ? textContent : null}
					<div className={classes.buttonGroup}>
						<Hidden mdUp>
							<VotesControls
								id={props.id}
								voteCollection={voteCollection}
								handleUpVote={props.handleUpVote}
								handleDownVote={props.handleDownVote}
								postIsOpen={props.postIsOpen}
								mobile
							>
								<span className={classes.counter}>{props.votes}</span>
							</VotesControls>
						</Hidden>

						{/* <Button
							disabled={props.postIsOpen}
							className={classes.commentIcon}
							startIcon={<ModeCommentIcon />}
						>
						</Button> */}
						<ModeCommentIcon fontSize="small" className={classes.commentIcon} />
						<span className={classes.iconText}>
							{props.comments ? props.comments : 0}
							<Hidden smDown> Kommentarer</Hidden>
						</span>
					</div>
					{props.postIsOpen && props.isLoggedIn ? (
						<>
							<Hidden smDown>
								<Typography
									className={classes.subText}
									variant="caption"
									component="p"
								>
									Kommenter som {props.username}
								</Typography>
							</Hidden>

							<Hidden mdUp>
								{replyOpen ? null : (
									<Card elevation={0} className={classes.toggleReplay}>
										<CardContent>
											<TextField
												onClick={handleToggleReply}
												id="outlined-basic"
												label="Skriv en kommentar"
												variant="outlined"
												fullWidth
												size="small"
											/>
										</CardContent>
									</Card>
								)}
							</Hidden>
							{replyOpen || !matchesDownSm ? (
								<Reply
									parent={null}
									post={props.id}
									topLevel
									handleToggleReply={handleToggleReply}
									closeButton
								/>
							) : null}
						</>
					) : null}
				</CardContent>
			</div>
			<div className={classes.children}>{props.children}</div>
		</Card>
	);
};

export default Post;
