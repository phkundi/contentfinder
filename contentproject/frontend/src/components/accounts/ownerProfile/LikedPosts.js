import React, { useState, useEffect } from "react";
import useContentState from "../../../hooks/useContentState";
import ContentCard from "../../usercontent/ContentCard";
import { ListContainer } from "../../styles/ContentListStyles";
import {
  UserProfileContainer,
  UserContentContainer,
  UserContentHeading,
} from "../../styles/UserProfileStyles";

function LikedPosts({ auth }) {
  const [posts, setPosts] = useState();
  const { getLikedContent } = useContentState();

  useEffect(() => {
    getLikedContent(setPosts);
  }, []);

  return (
    <UserProfileContainer>
      <UserContentContainer>
        <UserContentHeading>Content You Liked</UserContentHeading>
        {posts && (
          <ListContainer>
            {posts.map((post, i) => (
              <ContentCard
                key={i}
                content={post}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
              />
            ))}
          </ListContainer>
        )}
      </UserContentContainer>
    </UserProfileContainer>
  );
}

export default LikedPosts;
