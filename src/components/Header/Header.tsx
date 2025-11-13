"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import "./header.scss";
import AddForm from "./AddForm/AddForm";

const Header: FC = () => {
  const [isForm, setIsForm] = useState<boolean>(false);
  return (
    <header className="header">
      <div className="header__wrap">
        <Link href="/" className="header__store-title">
          WeatherNow
        </Link>
        <div className="header__add"></div>
        <button className="header__add-btn" onClick={() => setIsForm(!isForm)}>
          Add City
        </button>
      </div>

      {isForm ? <AddForm /> : null}
    </header>
  );
};

export default Header;
