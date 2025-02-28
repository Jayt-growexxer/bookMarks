const { MongoClient, ObjectId } = require("mongodb");
// const uri = require("./mongoDb");

// console.log(uri);

// const connectDB = async () => {
//   try {
//     const client = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//     return client.db("test");
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//     process.exit(1);
//   }
// };
const connectDB = require("./connectDb");
const fetchBookMark = require("./fetchBookMark");
const pipeLineQuery = require("./pipelineQuery");
const mostUsedTags = require("./mostUsedTags");
const tagBasedSearch = require("./tagbased");
const fullTextSearch = require("./fulltextSearch");

const collectionName = "bookMarkManager";
const sampleDocument = [
  {
    userId: new ObjectId("67bf0a7af5089f8fdf12572f"),
    title: "Angular Docs",
    url: "https://angular.io/docs",
    description: "Official Angular framework documentation",
    tags: ["Angular", "frontend", "JavaScript"],
    isPublic: true,
    createdAt: new Date("2025-02-27T13:25:00Z"),
  },
  {
    userId: new ObjectId("67bf0a92acc372b19a7cd3f1"),
    title: "Rust Programming Language",
    url: "https://doc.rust-lang.org/book/",
    description: "Learn Rust from the official Rust book",
    tags: ["Rust", "systems programming", "performance"],
    isPublic: false,
    createdAt: new Date("2025-02-27T13:30:00Z"),
  },
  {
    userId: new ObjectId("67bf0ac419106b9dbb379bf2"),
    title: "Linux Command Line",
    url: "https://linuxcommand.org/",
    description: "Learn Linux command line for beginners",
    tags: ["Linux", "CLI", "terminal"],
    isPublic: true,
    createdAt: new Date("2025-02-27T13:35:00Z"),
  },
  {
    userId: new ObjectId("67bf0b0b826aaad6b62070c4"),
    title: "DevDocs",
    url: "https://devdocs.io/",
    description: "API documentation for various programming languages",
    tags: ["API", "documentation", "development"],
    isPublic: true,
    createdAt: new Date("2025-02-27T13:40:00Z"),
  },
  {
    userId: new ObjectId("67bf098b5c0a0f577d6d2936"),
    title: "Go Programming Docs",
    url: "https://golang.org/doc/",
    description: "Official documentation for the Go programming language",
    tags: ["Go", "backend", "programming"],
    isPublic: false,
    createdAt: new Date("2025-02-27T13:45:00Z"),
  },
  {
    userId: new ObjectId("67bf099649111197d685d719"),
    title: "Kubernetes Documentation",
    url: "https://kubernetes.io/docs/",
    description: "Learn Kubernetes deployment and management",
    tags: ["Kubernetes", "DevOps", "orchestration"],
    isPublic: true,
    createdAt: new Date("2025-02-27T13:50:00Z"),
  },
  {
    userId: new ObjectId("67bf0a14855a4b57ec2a5d72"),
    title: "Docker Documentation",
    url: "https://docs.docker.com/",
    description: "Containerization guide with Docker",
    tags: ["Docker", "DevOps", "containers"],
    isPublic: false,
    createdAt: new Date("2025-02-27T13:55:00Z"),
  },
  {
    userId: new ObjectId("67bf0a7af5089f8fdf12572f"),
    title: "GraphQL Apollo Docs",
    url: "https://www.apollographql.com/docs/",
    description: "Learn GraphQL with Apollo",
    tags: ["GraphQL", "API", "Apollo"],
    isPublic: true,
    createdAt: new Date("2025-02-27T14:00:00Z"),
  },
  {
    userId: new ObjectId("67bf0a92acc372b19a7cd3f1"),
    title: "Tailwind CSS Guide",
    url: "https://tailwindcss.com/docs",
    description: "Documentation for Tailwind CSS framework",
    tags: ["CSS", "Tailwind", "frontend"],
    isPublic: false,
    createdAt: new Date("2025-02-27T14:05:00Z"),
  },
  {
    userId: new ObjectId("67bf0ac419106b9dbb379bf2"),
    title: "NestJS Documentation",
    url: "https://docs.nestjs.com/",
    description: "A guide to NestJS framework",
    tags: ["NestJS", "Node.js", "backend"],
    isPublic: true,
    createdAt: new Date("2025-02-27T14:10:00Z"),
  },
];
const dbCon = async () => {
  const db = await connectDB();
  return db.collection(collectionName);
};

const tagQuery = ["Javascript", "NoSQL"];
const searchText = "MongoDB Documentation";

const main = async () => {
  const bookmarkCollection = await dbCon();
  bookmarkCollection.createIndex({
    title: 1,
    description: 1,
    tags: 1,
    createdAt: -1,
  }); // await insertDocument(sampleDocument, bookmarkCollection);
  // await findDoc({ _id: new ObjectId('67bffea4da5a65bd6ae799d0') }, bookmarkCollection);
  // await tagBasedSearch(tagQuery, bookmarkCollection);
  await fullTextSearch(searchText, bookmarkCollection);
  // await pipeLineQuery(searchText, tagQuery, bookmarkCollection);
  //await fetchBookMark(bookmarkCollection);
  // await mostUsedTags(bookmarkCollection);

  console.log("Your Database is connected");
};

async function insertDocument(document, bookmarkCollection) {
  try {
    const result = await bookmarkCollection.insertMany(document);
    console.log(`Inserted document:`);
  } catch (error) {
    console.error("Error inserting document", error);
  }
}

async function updateDocument(filterDoc, updateData, bookmarkCollection) {
  try {
    const result = await bookmarkCollection.updateOne(filterDoc, {
      $set: updateData,
    });
    console.log(`Updated document: ${result.matchedCount}`);
  } catch (error) {
    console.error("Error updating document", error);
  }
}

async function deleteDoc(filterDocD, bookmarkCollection) {
  try {
    const result = await bookmarkCollection.deleteOne(filterDocD);
    console.log(`Deleted document: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error deleting document", error);
  }
}

async function findDoc(filterD, bookmarkCollection) {
  try {
    const result = await bookmarkCollection.findOne(filterD);
    console.log("Found document:", result);
  } catch (error) {
    console.error("Error finding document", error);
  }
}

//Question 1

//Question 2

// Question 3
//Full-Text Search + Tag Filter + Sorting
// This pipeline:
// Searches for bookmarks matching a keyword in title and description.
// Filters by tags.
// Sorts by createdAt (newest first).
// Limits results for pagination.
// async function pipeLineQuery(searchText, tagQuery, bookmarkCollection) {
//   try {
//     const result = await bookmarkCollection
//       .aggregate([
//         { $match: { title: searchText } },
//         { $match: { tags: { $in: tagQuery }, isPublic: true } },
//         { $sort: { createdAt: -1 } },
//         { $limit: 5 },
//       ])
//       .toArray();
//     console.log(result);
//   } catch (error) {
//     console.error("Error executing pipeline query", error);
//   }
// }
// async function fetchBookMark(bookmarkCollection) {
//   const result = await bookmarkCollection
//     .aggregate([
//       {
//         $lookup: {
//           from: "UserInfo",
//           localField: "userId",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       { $unwind: "$userDetails" },
//     ])
//     .toArray();
//   console.log("All documents:", result);
// }

// async function mostUsedTags(bookmarkCollection) {
//   try {
//     const result = await bookmarkCollection
//       .aggregate([
//         { $match: { isPublic: true } },
//         { $unwind: "$tags" },

//         { $group: { _id: "$tags", count: { $sum: 1 } } },
//         { $sort: { count: -1 } },
//         { $limit: 5 },
//       ])
//       .toArray();
//     console.log("Most used tags:", result);
//   } catch (error) {
//     console.error("Error executing pipeline query", error);
//   }
// }

main();
