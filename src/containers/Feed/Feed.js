import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import Layout from '../../components/Layout/Layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import * as firebase from '../../firebase/index';
import Post from '../../components/UI/Cards/Post/Post';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import OpenedPost from '../OpenedPost/OpenedPost';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		marginTop: '6.4rem',
		[theme.breakpoints.down('xs')]: {
			marginTop: '5.6rem',
		},
	},
	newPostForm: {
		marginBottom: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginBottom: '0.3rem',
		},
	},
}));

const ModalBackdrop = withStyles({
	root: {
		marginTop: '6.4rem',
	},
})(Backdrop);

const Feed = (props) => {
	const { isLoggedIn } = useStore()[0];
	const [posts, setPosts] = useState([]);
	const [openPostID, setOpenPostID] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const asyncDispatch = useStore(false)[1];

	const classes = useStyles();

	useEffect(() => {
		const unsubscribePosts = firebase.subscribeToCollection(
			'posts',
			'votes',
			(querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});

				setPosts(data);
			}
		);

		return () => {
			unsubscribePosts();
		};
	}, []);

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleUpVote = (id, collection) => {
		asyncDispatch('UPVOTE', { id, collection });
	};

	const handleDownVote = (id, collection) => {
		asyncDispatch('DOWNVOTE', { id, collection });
	};

	const handleOpenPost = (id) => {
		setModalOpen(true);
		setOpenPostID(id);
	};

	const content = posts.map(
		({ title, text, author, createdAt, votes, id, comments }) => {
			return (
				<Post
					key={id}
					title={title}
					text={text}
					author={author}
					createdAt={createdAt}
					votes={votes}
					id={id}
					comments={comments}
					handleDownVote={handleDownVote}
					handleUpVote={handleUpVote}
					handleOpenPost={handleOpenPost}
				></Post>
			);
		}
	);
	return (
		<Layout>
			<Modal
				BackdropComponent={ModalBackdrop}
				className={classes.modal}
				open={modalOpen}
				onClose={handleModalClose}
			>
				<>
					{modalOpen ? (
						<OpenedPost
							id={openPostID}
							handleDownVote={handleDownVote}
							handleUpVote={handleUpVote}
							handleOpenPost={handleOpenPost}
							handleModalClose={handleModalClose}
						/>
					) : null}
				</>
			</Modal>
			{isLoggedIn ? (
				<Hidden smDown>
					<Card elevation={7} className={classes.newPostForm}>
						<CardContent>
							<MaterialUILink tabIndex={-1} component={Link} to="/submit">
								<TextField
									id="outlined-basic"
									label="Nytt innlegg"
									variant="outlined"
									fullWidth
									size="small"
								/>
							</MaterialUILink>
						</CardContent>
					</Card>
				</Hidden>
			) : null}
			{content}
		</Layout>
	);
};

export default Feed;
