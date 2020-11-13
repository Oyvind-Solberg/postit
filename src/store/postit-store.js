import { initStore } from './store';
import * as firebase from '../firebase/index';
// import axios from '../axios-FirebaseAPI';

const configureStore = () => {
	const asyncActions = {
		LOG_IN: async (globalState, payload) => {
			const message = {
				text: 'Du er nå logget inn!',
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
				text: 'Velkommen til Postit!',
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
				text: 'Du er nå logget ut!',
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
				text: 'Innlegg publisert!',
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
		REPLY_POST: async (globalState, payload) => {
			const message = {
				text: 'Kommentar publisert!',
				severity: 'success',
			};
			await firebase
				.submitComment(
					payload.text,
					payload.parent,
					payload.post,
					globalState.user.username
				)
				.catch((error) => {
					message.text = error.message;
					message.severity = 'error';
				});
			return { message, showMessage: true };
		},
		UPVOTE: async (globalState, payload) => {
			let collectionName =
				payload.collection.norwegianName[0].toUpperCase() +
				payload.collection.norwegianName.slice(1);

			const message = {
				text: `${collectionName} oppstemt!`,
				severity: 'success',
			};

			await firebase
				.vote(payload.id, true, payload.collection)
				.catch((error) => {
					message.text = error.message;
					message.severity = 'error';
				});

			return { message, showMessage: true };
		},
		DOWNVOTE: async (globalState, payload) => {
			let collectionName =
				payload.collection.norwegianName[0].toUpperCase() +
				payload.collection.norwegianName.slice(1);

			const message = {
				text: `${collectionName} nedstemt!`,
				severity: 'success',
			};

			await firebase
				.vote(payload.id, false, payload.collection)
				.catch((error) => {
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
