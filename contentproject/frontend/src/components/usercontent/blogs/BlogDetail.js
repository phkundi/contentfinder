import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../axiosInstance";
import {
  ContentDetailContainer,
  ContentDetailImage,
  ContentDetailTitle,
  ContentDetailSubtitle,
  ContentDetailBody,
  ContentDetailInfo,
  ContentDetailURL,
} from "../../styles/contentDetailStyles";

function BlogDetail({ id }) {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axiosInstance.get(`content/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, []);

  if (blog) {
    return (
      <ContentDetailContainer>
        <ContentDetailImage source="https://source.unsplash.com/random" />
        <ContentDetailBody>
          <ContentDetailTitle>{blog.name}</ContentDetailTitle>
          <ContentDetailSubtitle muted={true}>
            By {blog.owner}
          </ContentDetailSubtitle>
          <ContentDetailURL href={blog.url}>
            {blog.url.replace(/(^\w+:|^)\/\//, "")}
          </ContentDetailURL>

          <ContentDetailInfo>
            <ContentDetailSubtitle>Description</ContentDetailSubtitle>
            <p>{blog.description}</p>
            <ContentDetailSubtitle marginTop={true}>
              About {blog.owner}
            </ContentDetailSubtitle>
            <p>
              Arthur Collins has left his routine behind and is travelling the
              world non-stop since 2018. Along his travels, he writes about his
              experiences and gives handy tips for less experienced travellers.
            </p>
            <ContentDetailSubtitle marginTop={true}>
              Latest Posts
            </ContentDetailSubtitle>
          </ContentDetailInfo>
        </ContentDetailBody>
      </ContentDetailContainer>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default BlogDetail;
