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

exports.voteOnPost = functions.https.onCall(async (data, context) => {
	// Check auth state
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'only authenticated users can vote'
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
			'You can only vote once!'
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
