const express = require("express");
const roleMiddleware = require("../middlewares/roleMiddleware");
const courseController = require("../controllers/courseController");

const router = express.Router();

router
  .route("/")
  .post(roleMiddleware(["admin", "teacher"]), courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);

module.exports = router;
