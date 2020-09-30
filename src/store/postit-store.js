import { initStore } from './store';
import * as firebase from '../firebase/index';
// import axios from '../axios-FirebaseAPI';

const configureStore = () => {
	const asyncActions = {
		LOG_IN: async (globalState, payload) => {
			await firebase
				.signInUser(payload.email, payload.password)
				.catch((error) => {
					console.log(error.code, error.message);
				});
			return { isLoading: false };
		},
		SIGN_UP: async (globalState, payload) => {
			const username = await firebase
				.createUser(payload.email, payload.password, payload.username)
				.catch((error) => {
					console.log(error.code, error.message);
				});
			return { isLoading: false, user: { username } };
		},
		LOG_OUT: async (globalState, payload) => {
			await firebase.signOut().catch((error) => {
				console.log(error.code, error.message);
			});
			return { isLoading: false };
		},
		SUBMIT_POST: async (globalState, payload) => {
			await firebase
				.submitPost(payload.title, payload.text, globalState.user.username)
				.catch((error) => {
					console.log(error.code, error.message);
				});
			return { isLoading: false };
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
	};

	initStore(asyncActions, actions, {
		isLoggedIn: null,
		isLoading: true,
		user: null,
	});
};

export default configureStore;
