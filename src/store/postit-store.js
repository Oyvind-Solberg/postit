import { initStore } from './store';
import * as firebase from '../firebase/index';
// import axios from '../axios-FirebaseAPI';

const configureStore = () => {
	const asyncActions = {
		LOG_IN: async (globalState, payload) => {
			const message = {
				text: 'You are logged in!',
				severity: 'success',
			};
			await firebase
				.signInUser(payload.email, payload.password)
				.catch((error) => {
					message.text = error.message;
					message.severity = 'error';
				});
			return { isLoading: false, message, showMessage: true };
		},
		SIGN_UP: async (globalState, payload) => {
			const message = {
				text: 'Welcome to Postit!',
				severity: 'success',
			};
			const username = await firebase
				.createUser(payload.email, payload.password, payload.username)
				.catch((error) => {
					message.text = error.message;
					message.severity = 'error';
				});
			return {
				isLoading: false,
				user: { username },
				message,
				showMessage: true,
			};
		},
		LOG_OUT: async (globalState, payload) => {
			const message = {
				text: 'Your are now logged out!',
				severity: 'success',
			};
			await firebase.signOut().catch((error) => {
				message.text = error.message;
				message.severity = 'error';
			});
			return { isLoading: false, message, showMessage: true };
		},
		SUBMIT_POST: async (globalState, payload) => {
			const message = {
				text: 'Post submitted!',
				severity: 'success',
			};
			await firebase
				.submitPost(payload.title, payload.text, globalState.user.username)
				.catch((error) => {
					message.text = error.message;
					message.severity = 'error';
				});
			return { isLoading: false, message, showMessage: true };
		},
		UPVOTE_POST: async (globalState, payload) => {
			const message = {
				text: 'Post upvoted!',
				severity: 'success',
			};

			await firebase.voteOnPost(payload.id, true).catch((error) => {
				message.text = error.message;
				message.severity = 'error';
			});

			return { message, showMessage: true };
		},
		DOWNVOTE_POST: async (globalState, payload) => {
			const message = {
				text: 'Post downvoted!',
				severity: 'success',
			};

			await firebase.voteOnPost(payload.id, false).catch((error) => {
				message.text = error.message;
				message.severity = 'error';
			});
			return { message, showMessage: true };
		},
	};
	const actions = {
		SET_IS_LOGGED_IN: (globalState, payload) => {
			return { isLoggedIn: payload };
		},
		SET_IS_LOADING: (globalState, payload) => {
			return { isLoading: payload };
		},
		SET_USER: (globalState, payload) => {
			return { user: payload };
		},
		SET_SHOW_MESSAGE: (globalState, payload) => {
			return { showMessage: payload };
		},
	};

	initStore(asyncActions, actions, {
		isLoggedIn: null,
		isLoading: true,
		user: null,
		message: { text: null, severity: null },
		showMessage: false,
	});
};

export default configureStore;
