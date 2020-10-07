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
import { withStyles } from '@material-ui/core/styles';

const PostCard = withStyles({
	root: {
		marginBottom: '.8rem',
		'&:last-child': {
			marginBottom: '0',
		},
	},
})(Card);

const Feed = (props) => {
	const { isLoggedIn } = useStore()[0];
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.subscribeToCollection(
			'posts',
			(querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push(doc.data());
				});

				setPosts(data);
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	const content = posts.map(({ title, text, author, createdAt }) => {
		const date = new Date(createdAt);
		const time =
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2);

		return (
			<PostCard elevation={7} key={createdAt}>
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
			</PostCard>
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
