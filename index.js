//initialization start ++++++++++++++++++++++++++++++++++++++++++++++++
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//initialization end ------------------------------------------

// middleware start ++++++++++++++++++++++++++++++++++++++++++++++++++

// middleware end ----------------------------------------------------

async function run() {
  try {
    //test connection +++++++++++++++++++++++++++++++++++++++++++
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
    //test connection -------------------------------------------

    //Database info +++++++++++++++++++++++++++++++++++++++++++++
    const database = client.db("classroomDB");
    const studentCollection = database.collection("students");
    //Database info ------------------------------------------

    // API Start ++++++++++++++++++++++++++++++++++++++++++++++

    // GET - all students
    app.get("/students", async (req, res) => {
      const result = await studentCollection.find().toArray();
      res.send(result);
    });

    // Add Bulk Data {Run it only once}
    const data = require("./data.json");
    // console.log(data);
    app.get("/add-student-script", async (req, res) => {
      const result = await studentCollection.insertMany(data);
      res.send(result);
    });

    // API End ------------------------------------------------
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server Running on (${port})`);
});
