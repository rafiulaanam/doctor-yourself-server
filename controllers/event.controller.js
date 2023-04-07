const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");



module.exports.getAllEvent = async (req, res, next) => {
  try {
   
    const db = getDb();


    const event = await db
      .collection("eventData")
      .find({})
      .toArray();

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  } 
};

module.exports.saveAEvent = async (req, res, next) => {
  try {
    const db = getDb();
    const event = req.body;

    const result = await db.collection("eventData").insertOne(event);
    console.log(result);

    if (!result.insertedId) {
      return res.status(400).send({ status: false, error: "Something went wrong!" });
    }

    res.send({ success: true, message: `Event added with id: ${result.insertedId}` });
  } catch (error) {
    next(error);
  }
};

module.exports.getEventDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
  

    if(!ObjectId.isValid(id)){
      return res.status(400).json({ success: false, error: "Not a valid event id."});
    }

    const event = await db.collection("eventData").findOne({_id: ObjectId(id)});

    if(!event){
      return res.status(400).json({ success: false, error: "Couldn't find a event with this id"});
    }

    res.status(200).json({ success: true, data: event });
    
  } catch (error) {
    next(error);
  }
};

module.exports.updateEvent = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid event id." });
    }

    const event = await db.collection("eventData").updateOne({ _id: ObjectId(id) }, { $set: req.body });

    if (!event.modifiedCount) {
      return res.status(400).json({ success: false, error: "Couldn't update the event" });
    }

    res.status(200).json({ success: true, message: "Successfully updated the event" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid event id." });
    }

    const event = await db.collection("eventData").deleteOne({ _id: ObjectId(id) });

    if (!event.deletedCount) {
      return res.status(400).json({ success: false, error: "Couldn't delete the event" });
    }

    res.status(200).json({ success: true, message: "Successfully deleted the event" });
  } catch (error) {
    next(error);
  }
};


