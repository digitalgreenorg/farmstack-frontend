import React from "react";
import "./style.css";

function extractVideoId(url) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=share&v=))([^\?&"'>]+)/;

  // Execute the regular expression and get the first capturing group
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    // Return null or handle the case when no match is found
    return null;
  }
}
const YouTubeEmbed = ({ embedUrl }) => {
  const videoId = extractVideoId(embedUrl);
  return (
    <div className="video-responsive">
      <iframe
        width="367px"
        height="206px"
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
