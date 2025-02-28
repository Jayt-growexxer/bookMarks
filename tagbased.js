async function tagBasedSearch(tagQuery, bookmarkCollection) {
  try {
    const result = await bookmarkCollection
      .find({ tags: { $in: tagQuery }, isPublic: true })
      .toArray();
    console.log("Found documents based on tag search:", result);
  } catch (error) {
    console.error("Error finding document", error);
  }
}
