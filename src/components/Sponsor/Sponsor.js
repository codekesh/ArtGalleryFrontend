import React from "react";
import "./Sponsor.css";

const Sponsor = () => {
  const sponsor1 = require("../../images/Sponsors/google.png");
  const sponsor2 = require("../../images/Sponsors/meta.png");
  const sponsor3 = require("../../images/Sponsors/instagram.png");
  const sponsor4 = require("../../images/Sponsors/React.png");
  const sponsor5 = require("../../images/Sponsors/spotify.png");
  return (
    <div className="sponsors">
      <h1 className="spon_head">Sponsors</h1>
      <img src={sponsor1} alt="sponsors" />
      <img src={sponsor2} alt="sponsors" />
      <img src={sponsor3} alt="sponsors" />
      <img src={sponsor4} alt="sponsors" />
      <img src={sponsor5} alt="sponsors" />
    </div>
  );
};

export default Sponsor;
