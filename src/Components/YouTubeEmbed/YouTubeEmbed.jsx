import React from "react";
import "./style.css";
const YouTubeEmbed = ({ embedUrl }) => {
  const videoId = embedUrl.split("/").pop().split("?")[0];
  return (
    <div className="video-responsive">
      <iframe
        width="300px"
        height="100px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
