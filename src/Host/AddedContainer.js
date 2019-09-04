import React from "react";
import RoundCard from "./RoundCard";
import QuestionCard from "./QuestionCard";

const mapContent = (contentType, added, removeChild, reorderAdded) => {
  switch (contentType) {
    case "rounds":
      return added
        .sort((a, b) => {
          return a.index - b.index;
        })
        .map(child => {
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
      return added
        .sort((a, b) => {
          return a.index - b.index;
        })
        .map(child => {
          return (
            <RoundCard
              key={child.id}
              round={child}
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
  if (added.length === 0) {
    return (
      <div>
        You haven't added anything yet - try adding something from below!
      </div>
    );
  } else {
    return (
      <div>{mapContent(contentType, added, removeChild, reorderAdded)}</div>
    );
  }
};

export default AddedContainer;
