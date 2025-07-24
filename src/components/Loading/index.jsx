import React, { memo } from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading-section">
      <main>
        <div className="preloader">
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
        </div>
        <div className="status">
          Loading<span className="status__dot">.</span>
          <span className="status__dot">.</span>
          <span className="status__dot">.</span>
        </div>
      </main>
    </div>
  );
};

export default memo(Loading);
