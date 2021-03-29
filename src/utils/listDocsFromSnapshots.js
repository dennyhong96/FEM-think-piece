const listDocsFromSnapshots = snapshots =>
	snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

export default listDocsFromSnapshots;
