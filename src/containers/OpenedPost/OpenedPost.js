import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import * as firebase from '../../firebase/index';
import Post from '../../components/UI/Cards/Post/Post';
import Container from '@material-ui/core/Container';
import Comment from '../../components/UI/Cards/Comment/Comment';
import { colorTheme } from '../../shared/styles/colorTheme';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '4rem',
		[theme.breakpoints.down('sm')]: {
			padding: '.5rem 0',
		},
		backgroundColor: colorTheme.neutral,
		height: '100%',
		overflow: 'auto',
	},
	paper: {
		borderTopRightRadius: '20px',
		borderTopLeftRadius: '20px',
		backgroundColor: 'transparent',
	},
	comments: {
		marginTop: '.5rem',
		borderTopLeftRadius: '0',
		borderTopRightRadius: '0',
	},
}));

const OpenedPost = (props) => {
	const [comments, setComments] = useState([]);
	const [post, setPost] = useState({});
	const { user } = useStore()[0];
	const { isLoggedIn } = useStore()[0];
	const classes = useStyles(props);

	useEffect(() => {
		let unsubscribeComments = firebase.subscribeToCollectionWithQuery(
			'comments',
			{ key: 'post', value: props.id },
			'points',
			(querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});

				setComments(data);
			}
		);

		const unsubscribePost = firebase.subscribeToDoc(
			'posts',
			props.id,
			(doc) => {
				setPost({ ...doc.data(), id: doc.id });
			}
		);

		return () => {
			unsubscribeComments();
			unsubscribePost();
		};
	}, []);

	const rootComments = comments.filter((comment) => {
		return comment.parent === null;
	});

	const createComments = (parentID) => {
		const children = comments.filter((comment) => comment.parent === parentID);
		const childrenComments = [];

		children.forEach((comment) => {
			childrenComments.push(
				<Comment
					key={comment.id}
					text={comment.text}
					author={comment.author}
					createdAt={comment.createdAt}
					points={comment.points}
					id={comment.id}
					post={post.id}
					handleDownVote={props.handleDownVote}
					handleUpVote={props.handleUpVote}
					isLoggedIn={isLoggedIn}
				>
					{createComments(comment.id)}
				</Comment>
			);
		});

		if (children.lenght === 0) {
			return null;
		} else {
			return childrenComments;
		}
	};

	return (
		<Container className={classes.root} maxWidth="md">
			<Paper elevation={7} className={classes.paper}>
				<Post
					key={post.id}
					title={post.title}
					text={post.text}
					author={post.author}
					createdAt={post.createdAt}
					votes={post.votes}
					id={post.id}
					comments={post.comments}
					handleDownVote={props.handleDownVote}
					handleUpVote={props.handleUpVote}
					handleOpenPost={props.handleOpenPost}
					handleModalClose={props.handleModalClose}
					postIsOpen
					username={user ? user.username : null}
					isLoggedIn={isLoggedIn}
					hasComments={rootComments.length !== 0}
				></Post>
				{rootComments.length !== 0 ? (
					<Card elevation={0} className={classes.comments}>
						{rootComments.map((comment) => {
							return (
								<Comment
									isTopLevel
									key={comment.id}
									text={comment.text}
									author={comment.author}
									createdAt={comment.createdAt}
									points={comment.points}
									id={comment.id}
									post={props.id}
									handleDownVote={props.handleDownVote}
									handleUpVote={props.handleUpVote}
									isLoggedIn={isLoggedIn}
								>
									{createComments(comment.id)}
								</Comment>
							);
						})}
					</Card>
				) : null}
			</Paper>
		</Container>
	);
};

export default OpenedPost;
