import React from "react";
import "./styles.css";
import HeroImage from "../../static/HeroImage.png";

export default function HomePage() {
  return (
    <div>
      <div className="grainy"></div>
      <div className="container">
        <section>
          <div className="section--hero">
            <div className="section--hero--left">
              <p className="title">
                Democratizing Land Ownership for Investors and DAOs
              </p>
              {/* <p>
                The world’s first platform for buying and trading tokenized real
                estate by DAOs.
              </p> */}
              {/* <button className="primary--button">PRIMARY</button> */}
            </div>
            <div className="section--hero--right">
              <img className="hero--image" src={HeroImage} alt="hero" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
