import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import Layout from '../../components/Layout/Layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as firebase from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import { colorTheme } from '../../shared/styles/colorTheme';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginBottom: '.8rem',
		'&:last-child': {
			marginBottom: '0',
		},
	},
	votesControls: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'center',
		backgroundColor: colorTheme.neutralLight,
		padding: theme.spacing(1),
	},
}));

const Feed = (props) => {
	const { isLoggedIn } = useStore()[0];
	const [posts, setPosts] = useState([]);
	const asyncDispatch = useStore(false)[1];

	const classes = useStyles();

	useEffect(() => {
		const unsubscribe = firebase.subscribeToCollection(
			'posts',
			(querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});

				setPosts(data);
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	const handleUpVote = (id) => {
		asyncDispatch('UPVOTE_POST', id);
	};

	const handleDownVote = (id) => {
		asyncDispatch('DOWNVOTE_POST', id);
	};

	const content = posts.map(({ title, text, author, createdAt, votes, id }) => {
		const date = new Date(createdAt);
		const time =
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2);

		return (
			<Card className={classes.root} elevation={7} key={id}>
				<div className={classes.votesControls}>
					<IconButton
						size="small"
						onClick={(id) => {
							handleUpVote(id);
						}}
					>
						<ArrowUpwardIcon />
					</IconButton>
					<Typography variant="subtitle2" component="p">
						{votes}
					</Typography>
					<IconButton
						size="small"
						onClick={(id) => {
							handleDownVote(id);
						}}
					>
						<ArrowDownwardIcon />
					</IconButton>
				</div>
				<CardContent>
					<Typography variant="caption" component="p">
						Posted by {author} at {date.toDateString()}, {time}
					</Typography>
					<Box mt={0.8}>
						<Typography variant="h6" component="h2">
							{title}
						</Typography>
					</Box>
					{text ? (
						<>
							<Box mt={1.2}>
								<Typography variant="body1">{text}</Typography>
							</Box>
						</>
					) : null}
				</CardContent>
			</Card>
		);
	});
	return (
		<Layout>
			{isLoggedIn ? (
				<Box mb={2.5}>
					<Card elevation={7}>
						<CardContent>
							<MaterialUILink component={Link} to="/submit">
								<TextField
									id="outlined-basic"
									label="Create Post"
									variant="outlined"
									fullWidth
									size="small"
								/>
							</MaterialUILink>
						</CardContent>
					</Card>
				</Box>
			) : null}
			{content}
		</Layout>
	);
};

export default Feed;
