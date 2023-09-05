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
        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63834.74715048414!2d34.08431422071671!3d0.49120649344774664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177fa140f465654f%3A0x68fa5e85fcab9513!2sKenya%2C%20Kenya!5e0!3m2!1sen!2sin!4v1693896461896!5m2!1sen!2sin"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKenya!5e0!3m2!1sen!2sus!4v1630761000000!5m2!1sen!2sin`}
        // https:
        width="100%" //www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659595453!2d77.46612773570493!3d12.954280233882482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1693907932197!5m2!1sen!2sin
        height="240"
        style={{ borderRadius: "5px" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="google_map"
      ></iframe>
      {/* <iframe
        src="https://www.google.com/maps/embed?pb==!4m4!3m3!8m2!3d37.774929!4d-122.419416&amp"
        width="100%"
        height="400"
        // frameBorder="0"
        style={{ border: 0 }}
      ></iframe> */}
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.759401693116!2d34.09916465140945!3d0.4597936425711443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177fa140f465654f%3A0x68fa5e85fcab9513!2sBusia%2C%20Kenya!5e0!3m2!1sen!2sin!4v1693895788202!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
    </div>
  );
}

export default MyMap;
