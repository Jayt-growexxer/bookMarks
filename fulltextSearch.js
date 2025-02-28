async function fullTextSearch(searchText, bookmarkCollection) {
  try {
    const result = await bookmarkCollection
      .find({
        $or: [
          { title: { $regex: searchText } },
          { description: { $regex: searchText } },
        ],
      })
      .toArray();
    console.log("Found documents based on full text search:", result);
  } catch (error) {
    console.error("Error finding document", error);
  }
}

module.exports = fullTextSearch;
