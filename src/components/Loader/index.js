import React from "react";
import  ReactLoader from "react-loader-spinner";
import "./style.css";

export default function Loader(props) {
  return (
    <div className="main_loader">
      <div className="overlay"></div>
      <div className="content">
        <ReactLoader
          type={props.type || "Oval"}
          color={props.color || "#1E4A86"}
          height={props.height || 60}
          width={props.width || 60}
        />
        <div className="loading-text">{props.text}</div>
      </div>
    </div>
  );
}
