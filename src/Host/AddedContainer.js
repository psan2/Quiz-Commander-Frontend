import React from "react";
import RoundCard from "./RoundCard";
import QuestionCard from "./QuestionCard";

const mapContent = (contentType, added, removeChild, reorderAdded) => {
  switch (contentType) {
    case "rounds":
      return added.map(child => {
        return (
          <QuestionCard
            key={child.id}
            question={child}
            edit={true}
            added={true}
            removeChild={removeChild}
            reorderAdded={reorderAdded}
          />
        );
      });
    case "quizzes":
      return added.map(child => {
        return (
          <RoundCard
            key={child.id}
            question={child}
            edit={true}
            added={true}
            removeChild={removeChild}
            reorderAdded={reorderAdded}
          />
        );
      });
    default:
      break;
  }
};

const AddedContainer = ({ contentType, added, removeChild, reorderAdded }) => {
  return <div>{mapContent(contentType, added, removeChild, reorderAdded)}</div>;
};

export default AddedContainer;
