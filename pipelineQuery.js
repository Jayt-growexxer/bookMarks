async function pipeLineQuery(searchText, tagQuery, bookmarkCollection) {
  try {
    const result = await bookmarkCollection
      .aggregate([
        { $match: { title: searchText } },
        { $match: { tags: { $in: tagQuery }, isPublic: true } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
      ])
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Error executing pipeline query", error);
  }
}
module.exports = pipeLineQuery;
