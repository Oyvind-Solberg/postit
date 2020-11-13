import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BackgroundOverlay from '../../components/Layout/BackgroundOverlay/BackgroundOverlay';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	textField: {
		padding: '0 0 1.6rem 0',
	},
	buttonGroup: {
		display: 'inline-flex',
		justifyContent: 'flex-end',
		width: '100%',
	},
	button: {
		marginRight: '1rem',
		'&:last-child': {
			marginRight: '0',
		},
	},
	title: {
		marginBottom: '1.6rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem',
			marginLeft: '1.6rem',
		},
	},
	form: {
		padding: '1.6rem',
	},
}));

const Submit = (props) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles(props);
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
			<Hidden mdUp>
				<BackgroundOverlay />
			</Hidden>
			<Typography className={classes.title} variant="h6" component="h2">
				Opprett nytt innlegg
			</Typography>
			<Paper elevation={matchesDownSm ? 0 : 7}>
				<form className={classes.form}>
					<TextField
						className={classes.textField}
						id="title"
						label="Tittel"
						required
						fullWidth
						onChange={handleTitleChange}
						value={title}
						variant={matchesDownSm ? 'standard' : 'outlined'}
						size="small"
					/>
					<TextField
						className={classes.textField}
						id="text "
						label="Tekst (valgfritt)"
						multiline
						rows={matchesDownSm ? 6 : 12}
						fullWidth
						onChange={handleTextChange}
						value={text}
						variant={matchesDownSm ? 'standard' : 'outlined'}
						size="small"
					/>
					<div className={classes.buttonGroup}>
						<Button
							className={classes.button}
							variant="outlined"
							color="primary"
							component={Link}
							to="/"
						>
							Avbryt
						</Button>
						<Button
							className={classes.button}
							onClick={handleSubmit}
							variant="contained"
							disabled={!formIsValid}
							color="primary"
						>
							Publiser
						</Button>
					</div>
				</form>
			</Paper>
		</Layout>
	);
};

export default Submit;
