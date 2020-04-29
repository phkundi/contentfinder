import React, { createContext, useReducer } from "react";
import contentReducer from "../reducers/contentReducer";

export const ContentContext = createContext();

const initialState = {
  content: null,
  type: false,
  filter: null,
};

export function ContentProvider(props) {
  const [content, dispatchContent] = useReducer(contentReducer, initialState);

  const value = { content, dispatchContent };
  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
}
