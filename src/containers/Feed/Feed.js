import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import Layout from '../../components/Layout/Layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as firebase from '../../firebase/index';

const Feed = (props) => {
	const { isLoggedIn } = useStore()[0];
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// let unmounted = false;

		const unsubscribe = firebase.subscribeToCollection(
			'posts',
			(querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push(doc.data());
				});

				// if (!unmounted) {
				setPosts(data);
				// }
			}
		);

		return () => {
			unsubscribe();
			// unmounted = true;
		};
	}, []);

	const content = posts.map(({ title, text, author, createdAt }) => {
		const date = new Date(createdAt);
		const time =
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2);

		return (
			<Card key={createdAt}>
				<CardContent>
					<Typography>
						Posted by {author} at {date.toDateString()}, {time}
					</Typography>
					<Typography>{title}</Typography>
					<Typography>{text}</Typography>
				</CardContent>
			</Card>
		);
	});
	return (
		<Layout>
			{isLoggedIn ? (
				<Card>
					<CardContent>
						<MaterialUILink component={Link} to="/submit">
							<TextField
								id="outlined-basic"
								label="Create Post"
								variant="outlined"
								fullWidth
							/>
						</MaterialUILink>
					</CardContent>
				</Card>
			) : null}
			{content}
		</Layout>
	);
};

export default Feed;
