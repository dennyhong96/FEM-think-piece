import { db } from "@lib/firebase";

import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";

export const listPosts = () => db.collection("posts").get().then(listDocsFromSnapshots);

export const createPost = post => db.collection("posts").add({ ...post });
