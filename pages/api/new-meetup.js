import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://master:kusxzqpn5M4Uowhj@cluster0.ae3k2.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);

    console.log(result)

    client.close();
    
    res.status(201).json({message: "Meetup inserted"})
  }
};

export default handler;
