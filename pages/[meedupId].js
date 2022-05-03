import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
    />
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://master:kusxzqpn5M4Uowhj@cluster0.ae3k2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meedupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meedupId = context.params.meedupId;
  const client = await MongoClient.connect(
    "mongodb+srv://master:kusxzqpn5M4Uowhj@cluster0.ae3k2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meedupId),
  });

  client.close();
  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
