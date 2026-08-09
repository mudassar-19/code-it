const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mudassarnaeem19_db_user:oAOsfPHB0jQNtZ1u@codeit-portfolio.ftz3yck.mongodb.net/?appName=CodeIT-Portfolio";

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
