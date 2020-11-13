import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyCBi6Drpb30GAVxeaUUPqoUvFewdaE6DsA',
	authDomain: 'postit-2fb46.firebaseapp.com',
	databaseURL: 'https://postit-2fb46.firebaseio.com',
	projectId: 'postit-2fb46',
	storageBucket: 'postit-2fb46.appspot.com',
	messagingSenderId: '606327351737',
	appId: '1:606327351737:web:6d38292bc3899b4dda6e68',
	measurementId: 'G-T4T2P0V6PC',
};

const firebaseApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const functions = firebaseApp.functions();

export async function createUser(email, password, username) {
	await auth.createUserWithEmailAndPassword(email, password);
	await auth.currentUser.updateProfile({
		displayName: username,
	});
	const displayName = await auth.currentUser.displayName;
	return displayName;
}

export async function signInUser(email, password) {
	await auth.signInWithEmailAndPassword(email, password);
}

export function checkAuth(callback) {
	return auth.onAuthStateChanged(callback);
}

export async function signOut() {
	await auth.signOut();
}

export function subscribeToCollection(collection, sortName, callback) {
	return db
		.collection(collection)
		.orderBy(sortName, 'desc')
		.onSnapshot(callback);
}

export function subscribeToCollectionWithQuery(
	collection,
	query,
	sortName,
	callback
) {
	return db
		.collection(collection)
		.where(query.key, '==', query.value)
		.orderBy(sortName, 'desc')
		.onSnapshot(callback);
}

export function subscribeToDoc(collection, doc, callback) {
	return db.collection(collection).doc(doc).onSnapshot(callback);
}

export async function submitPost(title, text, author) {
	const submit = functions.httpsCallable('submitPost');
	await submit({ author, title, text });
}

export async function submitComment(text, parent, post, author) {
	const submit = functions.httpsCallable('submitComment');
	await submit({ author, text, parent, post });
}

export async function vote(id, isUpvoting, collection) {
	const vote = functions.httpsCallable('vote');
	await vote({ id, isUpvoting, collection });
}
