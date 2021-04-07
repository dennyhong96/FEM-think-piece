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
exports.sanitizePost = functions.firestore
	.document("posts/{postId}")
	.onWrite(async (change, context) => {
		// `change` has before & after
		if (!change.after.exists) return; // document deleted

		const { content, isSanitized } = change.after.data();

		// Use `isSanitized` to stop from sanitization being executed infinately
		if (content && !isSanitized) {
			return change.after.ref.update({
				content: content.replace(/CoffeeScript/g, "**********"),
				isSanitized: true,
			});
		}

		// Always need to return in cloud functions
		return null;
	});

// Update comment count of a post on comment creation
exports.incrementCommentCount = functions.firestore
	.document("posts/{postId}/comments/{commentId}")
	.onCreate(async (snapshot, context) => {
		const { postId, commentId } = context.params;

		// Find the parent post of the new comment
		const postRef = db.collection("posts").doc(postId);
		const numCommentsSnapshot = await postRef.get("numComments"); // Only get `numComments` field, instead of ...postRef.data()
		const numComments = numCommentsSnapshot.get("numComments");

		return postRef.update({ numComments: numComments + 1 });
	});

// Also can listen to auth changes
// - Create user document in DB after signing up
