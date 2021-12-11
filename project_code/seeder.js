const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

/* URIs defined in .env */
const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI
);


async function main() {
    try {
      await client.connect();
      const db = client.db();
      const results = await db.collection("guides").find({}).count();
      
      /**
       * If existing records then delete the current collections
       */
      if (results) {
        db.collection("guides").drop();
      }
  
      const load = loading("Creating collections").start();

      /* Import json data */
      const data = await fs.readFile(path.join(__dirname, "guides.json"), "utf8");
      await db.collection("guides").insertMany(JSON.parse(data));

      /*const recommenders = await db.collection("guides").aggregate([

        db.guides.aggregate([
          {$group: {
              _id: "$recommended_by",
              handle: {$first: "$handle"},
              aboutme: {$first: "$aboutme"},
              num_reviews:{$sum:1}
              }
            },
          {$project: {
              username: "$_id",
              "_id" : 0,
              handle: "$handle",
              num_reviews: "$num_reviews"
              }
            },
          {$out:"recommenders"}
        ])

  */
      

      
  
/**
 TODO: create another collection based on grouping - recommenders 
 Group by recommenders, take their username, twitter name (opt), github link (opt),
 keyinterests, specialty
      
  
**/
  
      load.stop();
      console.info(
        `Collection created...`
      );
  
  
      process.exit();
    } catch (error) {
      console.error("error:", error);
      process.exit();
    }
  }
  
  main();