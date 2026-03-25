const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const jsonPath = path.join(__dirname, "..", "..", "client", "js", "milestones.json");

async function main() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI is not set in server/.env");
        process.exit(1);
    }

    const raw = fs.readFileSync(jsonPath, "utf8");
    const docs = JSON.parse(raw);
    if (!Array.isArray(docs) || docs.length === 0) {
        console.error("milestones.json must be a non-empty JSON array");
        process.exit(1);
    }

    const client = new MongoClient(uri);
    await client.connect();

    const coll = client.db("milestones").collection("milestones");
    const result = await coll.insertMany(docs);

    console.log(`Inserted ${result.insertedCount} documents into milestones.milestones`);
    await client.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
