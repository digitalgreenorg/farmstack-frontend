import React from "react";

export default function UploadDataset(props) {
  return (
    <div className="datasetupload">
      <p className="accountsettingsheader">{props.uploadtitle}</p>
      <div className="accountsettingsuploadimg">
        <svg
          width={71}
          height={71}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <circle cx={35.5} cy={35.5} r={35.5} fill="#FFF7DC" />
          <circle cx={35.5} cy={35.5} r={29.5} fill="#F9EABC" />
          <circle cx={35.5} cy={35.5} r={23.5} fill="#C09507" />
          <circle
            cx={54}
            cy={49}
            r={11}
            fill="#fff"
            stroke="#C09507"
            strokeWidth={2}
          />
          <path
            d="M58.083 49.583h-3.5v3.5h-1.166v-3.5h-3.5v-1.166h3.5v-3.5h1.166v3.5h3.5v1.166Z"
            fill="#C09507"
          />
          <path
            d="M31 40h8v2h-8v-2Zm0-4h8v2h-8v-2Zm6-10h-8c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H41c1.1 0 2-.9 2-2V32l-6-6Zm4 18H29V28h7v5h5v11Z"
            fill="#fff"
          />
        </svg>
      </div>
      <p style={{ color: "#A3B0B8" }}>
        Drag and drop or
        <span>
          <button class="orguploadbtn info">Browse</button>
        </span>
        your files
      </p>
      <p style={{ color: "#A3B0B8" }}>{props.uploaddes}</p>
    </div>
  );
}
