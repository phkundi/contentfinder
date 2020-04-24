import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ContentCard from "../ContentCard";
import { axiosInstance } from "../../../axiosInstance";

const Wrapper = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.device.laptop} {
    padding: 0;
  }
`;

const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const BlogListHeading = styled.h2``;

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = () => {
      axiosInstance.get("content/blogs/").then((res) => {
        setBlogs(res.data);
      });
    };
    getBlogs();
  }, []);

  if (blogs) {
    return (
      <Wrapper>
        <BlogListHeading>Blogs</BlogListHeading>
        <ListContainer>
          {blogs.map((blog) => (
            <ContentCard
              key={blog.id}
              content={blog}
              type="Blog"
              query="blogs"
            />
          ))}
        </ListContainer>
      </Wrapper>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default BlogList;
