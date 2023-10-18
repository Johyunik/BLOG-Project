import "./CSS/Home.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [board, setBoard] = useState([]);

  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = board.filter(
    (board) =>
      board.title.includes(searchTerm) || board.name.includes(searchTerm)
  );

  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoard(JSON.parse(savedBoards));
    }
  }, []);

  useEffect(() => {
    if (post) {
      setBoard((prevBoard) => {
        const updatedBoards = [...prevBoard, post];
        localStorage.setItem("boards", JSON.stringify(updatedBoards));

        navigate("/", { state: { post: null } });
        return updatedBoards;
      });
    }
  }, [post]);

  return (
    <>
      <div id="searchItem">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="검색어를 입력하세요 "
        />
      </div>
      <div id="content">
        <div className="grid-container">
          {filteredBoards.map((value, index) => (
            <figure className="snip1200" key={index}>
              <img src={value.image} alt="이미지를 넣어주세요" />
              <figcaption>
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
    </>
  );
}
