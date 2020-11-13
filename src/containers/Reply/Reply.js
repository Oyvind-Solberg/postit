import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStore } from '../../store/store';
import { makeStyles } from '@material-ui/core/styles';
import { colorTheme } from '../../shared/styles/colorTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '0.48rem 2.88rem 0rem 0',
		[theme.breakpoints.down('sm')]: {
			padding: '0.48rem 0 0rem 0',
		},
	},
	textField: {
		padding: 0,
		'& fieldset': {
			borderBottomLeftRadius: '0',
			borderBottomRightRadius: '0',
			borderColor: colorTheme.neutralLight,
		},
	},
	buttonGroup: {
		display: 'inline-flex',
		justifyContent: 'flex-end',
		width: '100%',
		padding: '0.48rem 0.96rem',
		backgroundColor: colorTheme.neutralLight,
		[theme.breakpoints.down('sm')]: {
			backgroundColor: 'inherit',
			padding: '0.48rem 0',
		},
		borderBottomLeftRadius: '8px',
		borderBottomRightRadius: '8px',
	},
	closeButton: {
		borderRadius: '0',
		marginRight: '1rem',
	},
}));

const Reply = (props) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles(props);
	const [text, setText] = useState('');
	const [formIsValid, setFormIsValid] = useState(false);

	const asyncDispatch = useStore(false)[1];

	const simpleValidation = (newValue) => {
		if (newValue === '') {
			setFormIsValid(false);
		} else setFormIsValid(true);
	};

	const handleTextChange = (event) => {
		let input = event.target.value;
		setText(input);
		simpleValidation(input);
	};

	const handleSubmit = (event) => {
		asyncDispatch('REPLY_POST', {
			text,
			parent: props.parent,
			post: props.post,
		});
		setText('');
		setFormIsValid(false);

		if (!props.topLevel) {
			props.setReplyOpen(false);
		}
	};

	return (
		<form className={classes.root}>
			<TextField
				className={classes.textField}
				id="text "
				label="Hva tenker du på?"
				multiline
				rows={8}
				fullWidth
				onChange={handleTextChange}
				value={text}
				variant="outlined"
				size="small"
			/>
			<div className={classes.buttonGroup}>
				<Hidden mdUp>
					<IconButton
						className={classes.closeButton}
						size="small"
						onClick={props.handleToggleReply}
					>
						<CloseIcon />
					</IconButton>
				</Hidden>

				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={!formIsValid}
					color="primary"
					fullWidth={matchesDownSm}
				>
					Kommenter
				</Button>
			</div>
		</form>
	);
};

export default Reply;
