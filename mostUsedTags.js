async function mostUsedTags(bookmarkCollection) {
  try {
    const result = await bookmarkCollection
      .aggregate([
        { $match: { isPublic: true } },
        { $unwind: "$tags" },

        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ])
      .toArray();
    console.log("Most used tags:", result);
  } catch (error) {
    console.error("Error executing pipeline query", error);
  }
}

module.exports = mostUsedTags;
