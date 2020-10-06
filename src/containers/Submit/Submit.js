import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from '../../store/store';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles({
	root: {
		padding: 0,
	},
})(TextField);

const ButtonBox = withStyles({
	root: {
		display: 'inline-flex',
		justifyContent: 'flex-end',
		width: '100%',
	},
})(Box);

const Container = styled.div`
	height: 100vh;
	overflow: hidden;
`;

const Submit = (props) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [formIsValid, setFormIsValid] = useState(false);

	const asyncDispatch = useStore(false)[1];
	const dispatch = useStore(false)[2];

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

	const handleSubmit = (event) => {
		asyncDispatch('SUBMIT_POST', { title, text });
		dispatch('SET_IS_LOADING', true);
		props.history.push({ pathname: '/' });
	};

	return (
		<Layout>
			<Container>
				<Box mb={2}>
					<Typography variant="h6" component="h2">
						Create a post
					</Typography>
				</Box>
				<Paper elevation={7}>
					<form>
						<Box p={2}>
							<StyledTextField
								id="title"
								label="Title"
								required
								fullWidth
								onChange={handleTitleChange}
								value={title}
								variant="outlined"
								size="small"
							/>
							<Box pt={1.3} pb={2}>
								<StyledTextField
									id="text "
									label="Text (optional)"
									multiline
									rows={6}
									fullWidth
									onChange={handleTextChange}
									value={text}
									variant="outlined"
									size="small"
								/>
							</Box>
							<ButtonBox>
								<Box component="span" mr={1.3}>
									<Button
										variant="outlined"
										color="primary"
										component={Link}
										to="/"
									>
										Cancel
									</Button>
								</Box>
								<Button
									onClick={handleSubmit}
									variant="contained"
									disabled={!formIsValid}
									color="primary"
								>
									Post
								</Button>
							</ButtonBox>
						</Box>
					</form>
				</Paper>
			</Container>
		</Layout>
	);
};

export default Submit;
