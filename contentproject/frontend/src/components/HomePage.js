import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";

function HomePage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getContent = () => {
      axiosInstance.get("content/all/").then((res) => {
        setContent(res.data);
      });
    };
    getContent();
  }, []);
  return (
    <div>
      <h1>Content Finder</h1>
    </div>
  );
}

export default HomePage;
