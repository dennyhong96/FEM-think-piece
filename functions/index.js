const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Populate project secret key pairs automatically
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((req, res) => {
	functions.logger.info("Hello logs!", { structuredData: true });
	res.send("Hello from Firebase!");
});

exports.getAllPosts = functions.https.onRequest(async (req, res) => {
	const snapshots = await db.collection("posts").get();
	const posts = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	res.json({ posts });
});

// Sanitize post after creation/updates
exports.sanitizePost = functions.firestore.document("posts/{postId}").onWrite(async change => {
	if (!change.after.exists) return; // document deleted

	const { content, isSanitized } = change.after.data();

	// Use `isSanitized` to stop from function being called infinately
	if (content && !isSanitized) {
		return change.after.ref.update({
			content: content.replace(/CoffeeScript/g, "**********"),
			isSanitized: true,
		});
	}

	// Always need to return in cloud functions
	return null;
});
