import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from '../../store/store';

const Container = styled.div`
	max-height: 100vh;
	overflow: hidden;
`;

const Submit = (props) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [formIsValid, setFormIsValid] = useState(false);

	const dispatch = useStore(false)[1];

	const simpleValidation = (newValue) => {
		if (newValue === '') {
			setFormIsValid(false);
		} else setFormIsValid(true);
	};

	const handleTitleChange = (event) => {
		let input = event.target.value;
		setTitle(input);
		simpleValidation(input);
	};

	const handleTextChange = (event) => {
		let input = event.target.value;
		setText(input);
	};

	const handleSubmit = () => {
		dispatch('SUBMIT_POST', { title, text });
	};

	return (
		<Layout>
			<Container>
				<Typography>Create a post</Typography>
				<Paper>
					<form>
						<TextField
							id="title"
							label="Title"
							required
							fullWidth
							onChange={handleTitleChange}
							value={title}
						/>
						<TextField
							id="text "
							label="Text (optional)"
							multiline
							fullWidth
							onChange={handleTextChange}
							value={text}
						/>
						<Button variant="outlined" color="primary" component={Link} to="/">
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							variant="contained"
							disabled={!formIsValid}
							color="primary"
						>
							Post
						</Button>
					</form>
				</Paper>
			</Container>
		</Layout>
	);
};

export default Submit;
