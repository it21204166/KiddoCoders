import React, { Component } from "react";
import Back from "../common/back/Back";
import BlogCard from "./BlogCard";
import "./blog.css";

class Blog extends Component {
  render() {
    return (
      <>
        <Back title='Blog Posts' />
        <section className='blog padding'>
          <div className='container grid2'>
            <BlogCard />
          </div>
        </section>
      </>
    );
  }
}

export default Blog;
