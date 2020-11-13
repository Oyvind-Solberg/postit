const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate((user) => {
	return admin.firestore().collection('users').doc(user.uid).set({
		username: user.displayName,
		email: user.email,
		upvotedOn: [],
		downvotedOn: [],
	});
});

exports.newUserSignup = functions.auth.user().onCreate((user) => {
	return admin.firestore().collection('users').doc(user.uid).set({
		email: user.email,
		upvotedOn: [],
		downvotedOn: [],
	});
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
	const doc = admin.firestore().collection('users').doc(user.uid);
	return doc.delete();
});

exports.submitPost = functions.https.onCall((data, context) => {
	return admin.firestore().collection('posts').add({
		author: data.author,
		title: data.title,
		text: data.text,
		createdAt: Date.now(),
		votes: 0,
	});
});

exports.submitComment = functions.https.onCall(async (data, context) => {
	const postRef = admin.firestore().collection('posts').doc(data.post);

	await postRef.update({
		comments: admin.firestore.FieldValue.increment(1),
	});

	return admin.firestore().collection('comments').add({
		author: data.author,
		text: data.text,
		post: data.post,
		parent: data.parent,
		createdAt: Date.now(),
		points: 0,
	});
});

exports.vote = functions.https.onCall(async (data, context) => {
	// Check auth state
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Kunn innloggede brukere kan stemme!'
		);
	}

	// Get refs for user & target docs
	const userRef = admin.firestore().collection('users').doc(context.auth.uid);
	const targetRef = admin
		.firestore()
		.collection(data.collection.name)
		.doc(data.id);

	// Check if user already has voted
	const userDoc = await userRef.get();
	const upvotedOn = userDoc.data().upvotedOn;
	const downvotedOn = userDoc.data().downvotedOn;

	if (upvotedOn.includes(data.id) || downvotedOn.includes(data.id)) {
		throw new functions.https.HttpsError(
			'failed-precondition',
			`Du kan kunn stemme en gang per ${data.collection.norwegianName}!`
		);
	}

	// Update user array
	if (data.isUpvoting) {
		await userRef.update({
			upvotedOn: [...userDoc.data().upvotedOn, data.id],
		});
	} else {
		await userRef.update({
			downvotedOn: [...userDoc.data().downvotedOn, data.id],
		});
	}

	// Update votes on target
	return targetRef.update({
		[data.collection.field]: admin.firestore.FieldValue.increment(
			data.isUpvoting ? 1 : -1
		),
	});
});

// ****************
// Legacy functions
// ****************
exports.voteOnPost = functions.https.onCall(async (data, context) => {
	// Check auth state
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Kunn innloggede brukere kan stemme!'
		);
	}

	// Get refs for user & post docs
	const userRef = admin.firestore().collection('users').doc(context.auth.uid);
	const postRef = admin.firestore().collection('posts').doc(data.id);

	// Check if user already has voted
	const userDoc = await userRef.get();
	const upvotedOn = userDoc.data().upvotedOn;
	const downvotedOn = userDoc.data().downvotedOn;

	if (upvotedOn.includes(data.id) || downvotedOn.includes(data.id)) {
		throw new functions.https.HttpsError(
			'failed-precondition',
			'Du kan kunn stemme en gang per innlegg!'
		);
	}

	// Update user array
	if (data.isUpvoting) {
		await userRef.update({
			upvotedOn: [...userDoc.data().upvotedOn, data.id],
		});
	} else {
		await userRef.update({
			downvotedOn: [...userDoc.data().downvotedOn, data.id],
		});
	}

	// Update votes on post
	return postRef.update({
		votes: admin.firestore.FieldValue.increment(data.isUpvoting ? 1 : -1),
	});
});
