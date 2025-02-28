async function fetchBookMark(bookmarkCollection) {
  const result = await bookmarkCollection
    .aggregate([
      {
        $lookup: {
          from: "UserInfo",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
    ])
    .toArray();
  console.log("All documents:", result);
}

module.exports = fetchBookMark;
