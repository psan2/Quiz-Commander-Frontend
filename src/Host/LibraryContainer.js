import React from "react";
import RoundCard from "./RoundCard";
import QuestionCard from "./QuestionCard";

const mapContent = (contentType, library, addChild) => {
  switch (contentType) {
    case "rounds":
      return library.map(child => {
        return (
          <QuestionCard
            key={child.id}
            question={child}
            edit={true}
            added={false}
            addChild={addChild}
          />
        );
      });
    case "quizzes":
      return library.map(child => {
        return (
          <RoundCard
            key={child.id}
            question={child}
            edit={true}
            added={false}
            addChild={addChild}
          />
        );
      });
    default:
      break;
  }
};

const AddedContainer = ({ contentType, library, addChild }) => {
  return <div>{mapContent(contentType, library, addChild)}</div>;
};

export default AddedContainer;
