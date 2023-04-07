const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");



module.exports.getAllCourse = async (req, res, next) => {
  try {
   
    const db = getDb();


    const course = await db
      .collection("courses")
      .find({})
      .toArray();

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  } 
};

module.exports.saveACourse = async (req, res, next) => {
  try {
    const db = getDb();
    const course = req.body;

    const result = await db.collection("courseData").insertOne(course);
    console.log(result);

    if (!result.insertedId) {
      return res.status(400).send({ status: false, error: "Something went wrong!" });
    }

    res.send({ success: true, message: `course added with id: ${result.insertedId}` });
  } catch (error) {
    next(error);
  }
};

module.exports.getCourseDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
  

    if(!ObjectId.isValid(id)){
      return res.status(400).json({ success: false, error: "Not a valid course id."});
    }

    const course = await db.collection("courses").findOne({_id: ObjectId(id)});

    if(!course){
      return res.status(400).json({ success: false, error: "Couldn't find a course with this id"});
    }

    res.status(200).json({ success: true, data: course });
    
  } catch (error) {
    next(error);
  }
};

module.exports.updateCourse = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid course id." });
    }

    const course = await db.collection("courseData").updateOne({ _id: ObjectId(id) }, { $set: req.body });

    if (!course.modifiedCount) {
      return res.status(400).json({ success: false, error: "Couldn't update the course" });
    }

    res.status(200).json({ success: true, message: "Successfully updated the course" });
  } catch (error) {
    next(error);
  }
};

module.exports.deletecourse = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid course id." });
    }

    const course = await db.collection("courseData").deleteOne({ _id: ObjectId(id) });

    if (!course.deletedCount) {
      return res.status(400).json({ success: false, error: "Couldn't delete the course" });
    }

    res.status(200).json({ success: true, message: "Successfully deleted the course" });
  } catch (error) {
    next(error);
  }
};


