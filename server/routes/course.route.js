import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  getPubishedCourse,
  removeLecture,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controllers.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Course routes
router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPubishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);

// Lecture routes
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);

// Lecture routes
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

export default router;
