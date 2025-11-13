"use client";
import { addCity } from "@/store/citiesSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import "./add-form.scss";

const AddForm: FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputState(e.target.value);
  };

  const handleClick = () => {
    dispatch(addCity(inputState));
    setInputState("");
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-form__input"
        value={inputState}
        onChange={handleChange}
      />
      <button className="add-form__btn" type="submit" onClick={handleClick}>
        Add
      </button>
    </form>
  );
};

export default AddForm;
