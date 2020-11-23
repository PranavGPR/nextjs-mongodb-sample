import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  if (!client.isConnected()) await client.connect();
  const db = client.db("samples");
  return { db, client };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    const { db } = await connect();
    const users = await db.collection("users").findOne({ name: username });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};
