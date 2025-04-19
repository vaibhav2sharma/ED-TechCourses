import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

const useCourses = () => useContext(CourseContext);

export default useCourses;
