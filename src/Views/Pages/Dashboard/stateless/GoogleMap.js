import React, { useState } from "react";

function MyMap() {
  var placeName = "india";
  const [center, setCenter] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });
  return (
    <div>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKenya!5e0!3m2!1sen!2sus!4v1630761000000!5m2!1sen!2sin`}
        width="100%"
        height="240"
        style={{ borderRadius: "5px" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="google_map"
      ></iframe>
    </div>
  );
}

export default MyMap;
