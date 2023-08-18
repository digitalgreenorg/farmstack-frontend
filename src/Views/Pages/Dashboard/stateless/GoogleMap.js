import React from "react";

function MyMap() {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31917.518803485866!2d34.088864753985746!3d0.4597936202841249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177fa140f465654f%3A0x68fa5e85fcab9513!2sBusia%2C%20Kenya!5e0!3m2!1sen!2sin!4v1691733309795!5m2!1sen!2sin"
        width="100%"
        height="240"
        style={{ borderRadius: "5px" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default MyMap;
