// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
  const { db } = await connect();
  const result = await db.collection("users").insertOne({
    name: username,
    password: password,
    createdAt: new Date(),
  });
  res.json(result.ops[0]);
};
