import React from "react";
import RoundCard from "./RoundCard";
import QuestionCard from "./QuestionCard";

const mapContent = (contentType, added) => {
  switch (contentType) {
    case "rounds":
      return added.map(child => {
        return (
          <QuestionCard
            key={child.id}
            question={child}
            edit={true}
            added={true}
          />
        );
      });
    case "quizzes":
      return added.map(child => {
        return (
          <RoundCard key={child.id} question={child} edit={true} added={true} />
        );
      });
    default:
      break;
  }
};

const AddedContainer = props => {
  return <div>{mapContent(props.contentType, props.added)}</div>;
};

export default AddedContainer;
