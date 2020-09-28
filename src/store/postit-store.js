import { initStore } from './store';
import * as firebase from '../firebase/index';
// import axios from '../axios-FirebaseAPI';

const configureStore = () => {
	const asyncActions = {
		LOG_IN: (globalState, payload) => {
			firebase.signInUser(payload.email, payload.password).catch((error) => {
				console.log(error.code, error.message);
			});
		},
		SIGN_UP: (globalState, payload) => {
			firebase.createUser(payload.email, payload.password).catch((error) => {
				console.log(error.code, error.message);
			});
		},
		LOG_OUT: (globalState, payload) => {
			firebase.signOut().catch((error) => {
				console.log(error.code, error.message);
			});
		},
		SUBMIT_POST: (globalState, payload) => {
			console.log('Store: Post submitted!');
		},
	};
	const actions = {
		SET_IS_LOGGED_IN: (globalState, payload) => {
			return { isLoggedIn: payload };
		},
		SET_USERNAME: (globalState, payload) => {
			return { username: payload };
		},
		SET_USERID: (globalState, payload) => {
			return { userID: payload };
		},
		SET_IS_LOADING: (globalState, payload) => {
			return { isLoading: payload };
		},
	};

	initStore(asyncActions, actions, {
		isLoggedIn: null,
		username: null,
		userID: null,
		isLoading: true,
	});
};

export default configureStore;
