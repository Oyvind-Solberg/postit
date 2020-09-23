import React from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const posts = [
	{
		id: '4tegydf45ety6e4u67',
		title: 'Nice looking post!',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula at ex quis venenatis. Cras venenatis urna at nisl pharetra, ut vulputate enim sagittis',
		createdAt: Date.now(),
	},
	{
		id: '4tegyd745ety6e4u67',
		title: 'Nice looking post!',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula at ex quis venenatis. Cras venenatis urna at nisl pharetra, ut vulputate enim sagittis',
		createdAt: Date.now(),
	},
	{
		id: '4tegydf45et36e4u67',
		title: 'Nice looking post!',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula at ex quis venenatis. Cras venenatis urna at nisl pharetra, ut vulputate enim sagittis',
		createdAt: Date.now(),
	},
	{
		id: '48egydf45ety6e4u67',
		title: 'Nice looking post!',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula at ex quis venenatis. Cras venenatis urna at nisl pharetra, ut vulputate enim sagittis',
		createdAt: Date.now(),
	},
];

const Feed = (props) => {
	const content = posts.map(({ title, text, id }) => {
		return (
			<Card key={id}>
				<CardContent>
					<Typography>{title}</Typography>
					<Typography>{text}</Typography>
				</CardContent>
			</Card>
		);
	});
	return (
		<Layout>
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
			{content}
		</Layout>
	);
};

export default Feed;
