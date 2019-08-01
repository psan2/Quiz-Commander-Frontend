import React from "react";

const FilterBar = props => {
  const filters = (
    <React.Fragment>
      <div>
        <div id="" className="mini-card-icon" onClick={props.handleFilter}>
          ALL
        </div>
      </div>
      {/* <div>
        <img
          id="audio"
          onClick={props.handleFilter}
          className="mini-card-icon"
          src={require("../Assets/audio.png")}
          alt="audio question icon"
        />
      </div>
      <div>
        <img
          id="video"
          onClick={props.handleFilter}
          className="mini-card-icon"
          src={require("../Assets/video.png")}
          alt="video question icon"
        />
      </div> */}
      <div>
        <img
          id="text"
          onClick={props.handleFilter}
          className="mini-card-icon"
          src={require("../Assets/text.png")}
          alt="text question icon"
        />
      </div>
      <div>
        <img
          id="multiple"
          onClick={props.handleFilter}
          className="mini-card-icon"
          src={require("../Assets/multiple_choice.png")}
          alt="multiple choice question icon"
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="filter-bar">
      <div id="new-item">
        <div
          className="mini-card-icon new-content-item"
          onClick={() => props.openEditDrawer("")}
        >
          NEW
        </div>
      </div>
      {props.contentType !== "quizzes" ? filters : ""}
    </div>
  );
};

export default FilterBar;
