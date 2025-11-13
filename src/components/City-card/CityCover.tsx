import React, { FC } from "react";
import "./city-card.scss";

interface CoverProps {
  image: string;
}

const CityCover: FC<CoverProps> = ({ image }) => {
  return (
    <div
      className="city-cover"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default CityCover;
