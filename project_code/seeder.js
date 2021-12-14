
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
      
      /* If existing records then delete the current collections - dropDatase() not working*/
      if (results) {
        /*try {
          db.dropDatabase()
        } catch (e) {}*/
        db.collection("guides").drop();
        db.collection("recommenders").drop();
        db.collection("languages").drop();
        db.collection("formats").drop();
      }
  
      const load = loading("Creating collections").start();

      /* Import json data */
      const data = await fs.readFile(path.join(__dirname, "guides.json"), "utf8");
      await db.collection("guides").insertMany(JSON.parse(data));
      
      /* Create new collection using aggregation */
      const recommendersCollection = await db.collection("guides").aggregate([
        {
          $group: {
          _id: "$recommended_by",
          recommender_type: {$first: "$user_type"},
          num_reviews: {$sum: 1}
          }
        },
        {$project: {
          name: "$_id",
          "_id" : 0,
          recommender_type: "$recommender_type",
          num_reviews: "$num_reviews"
          }
        }
      ]);

      const recommenders = await recommendersCollection.toArray();
      await db.collection("recommenders").insertMany(recommenders);

      const addRecommendersRef = db.collection("recommenders").find({});
      const addRecommenders = await addRecommendersRef.toArray();

      addRecommenders.forEach(async ({_id, name}) => {
        await db.collection("guides").updateMany({recommended_by: name}, [
          { 
            $set: { 
              recommended_by_id: _id
              },
            },
          ]);
      });
            
      /* Create languages and format collections */
      const languages = await db.collection("guides").aggregate([
        { $group: { _id: "$language" } },
        { $project: { name: "$_id", "_id": 0 } }
      ]).toArray();
      await db.collection("languages").insertMany(languages);
  
      const addLanguageRef = db.collection("languages").find({});
      const addLanguage = await addLanguageRef.toArray();

      addLanguage.forEach(async ({_id, name}) => {
        await db.collection("guides").updateMany({language: name}, [
          { 
            $set: { 
              language_id: _id
              },
            },
          ]);
      });

      const format = await db.collection("guides").aggregate([
        { $group: { _id: "$format" } },
        { $project: { content_format: "$_id", "_id": 0 } }
      ]).toArray();
      await db.collection("formats").insertMany(format);

      const addFormatRef = db.collection("formats").find({});
      const addFormat = await addFormatRef.toArray();

      addFormat.forEach(async ({_id, content_format}) => {
        await db.collection("guides").updateMany({format: content_format}, [
          { 
            $set: { 
              format_id: _id
              },
            },
          ]);
      });

      await db.collection("guides").updateMany({}, { $unset: { user_type: ""} });

      load.stop();
      console.info(
        `Collections created, database ready...`
      );

      process.exit();
  } catch (error) {
      console.error("error:", error);
      process.exit();
  }
}

main();
