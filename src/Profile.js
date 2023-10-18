import React, { useEffect } from "react";
import { useState } from "react";
import "./CSS/Home.css";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  const style = {
    textAlign: "center",
    color: "white",
  };

  const flex = {
    display: "flex",
    justifyContent: "center",
  };

  const button = {
    position: "relative",
    top: "200px",
    zIndex: 1000,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const saveData = JSON.parse(localStorage.getItem("boards"));

    if (saveData) {
      setData(saveData);
    }
  }, []);

  const { email, password, name } = user || {};
  const filteredData = data.filter((value) => value.name === name);

  const handleDelete = (id) => {
    const updatedData = data.filter((value) => value.id !== id);
    setData(updatedData);
    localStorage.setItem("boards", JSON.stringify(updatedData));
  };

  return (
    <div style={style}>
      <h1>Profile</h1>
      <div style={flex}>Email: {email}</div>
      <br></br>
      <div style={flex}>Password: {password}</div>
      <br></br>
      <div style={flex}>Name: {name}</div>
      <br></br>
      <br></br>
      <h1>내 게시물</h1>
      <div id="content">
        <div className="grid-container">
          {filteredData.map((value, index) => (
            <figure className="snip1200" key={index}>
              <img src={value.image} alt="이미지를 넣어주세요" />
              <figcaption>
                <div style={button}>
                  <button type="button" onClick={() => handleDelete(value.id)}>
                    삭제
                  </button>
                </div>
                <p>{value.title}</p>
                <div className="heading">
                  <h2>
                    <span>{value.name}</span>
                  </h2>
                </div>
              </figcaption>
              <Link
                to={{
                  pathname: `/Board/${value.id}`,
                  state: { detail: value },
                }}
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
