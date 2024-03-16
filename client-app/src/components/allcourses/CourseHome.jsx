import React, { Component } from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";

class CourseHome extends Component {
  render() {
    return (
      <>
        <Back title='Explore Courses' />
        <CoursesCard />
        <OnlineCourses />
      </>
    );
  }
}

export default CourseHome;
