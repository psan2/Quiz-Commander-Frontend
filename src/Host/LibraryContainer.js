import React from "react";
import RoundCard from "./RoundCard";
import QuestionCard from "./QuestionCard";

const mapContent = (contentType, library) => {
  switch (contentType) {
    case "rounds":
      return library.map(child => {
        return (
          <QuestionCard
            key={child.id}
            question={child}
            edit={true}
            added={false}
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
          />
        );
      });
    default:
      break;
  }
};

const AddedContainer = props => {
  return <div>{mapContent(props.contentType, props.library)}</div>;
};

export default AddedContainer;
