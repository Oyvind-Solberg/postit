import { initStore } from './store';
import axios from '../axios-FirebaseAPI';

const configureStore = () => {
	const asyncActions = {
		LOG_IN: (globalState, payload) => {
			console.log('Store: Logged In!');
		},
		SIGN_UP: (globalState, payload) => {
			console.log('Store: Signed Up!');
		},
		LOG_OUT: (globalState, payload) => {
			console.log('Store: Logged Out!');
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
	};

	initStore(asyncActions, actions, {
		isLoggedIn: false,
		username: null,
		userID: null,
	});
};

export default configureStore;
