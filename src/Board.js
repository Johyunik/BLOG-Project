import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Board({ user }) {
  const style = {
    color: "white",
  };
  const div = {
    textAlign: "center",
  };
  const bold = {
    position: "relative",
    fontWeight: "bold",
    top: "40px",
    right: "410px",
  };

  const { id } = useParams();
  const { email, password, name } = user || {};
  const boards = JSON.parse(localStorage.getItem("boards")) || [];

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const foundDetail = boards.find((board) => board.id === Number(id));
    if (foundDetail) {
      setDetail(foundDetail);
    }
    console.log(name);
    console.log(detail);
  }, [id]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${detail.id}`);
  };

  return (
    <div style={div}>
      {detail ? (
        <>
          <h3 style={style}>{detail.name}</h3>
          <h2 style={style}>
            <p>{detail.title}</p>
          </h2>
          <br></br>
          <p
            style={style}
            dangerouslySetInnerHTML={{ __html: detail.text }}
          ></p>
          <img src={detail.image} style={{ width: "800px", height: "500px" }} />
          {user?.name === detail?.name && (
            <button style={bold} type="button" onClick={handleEdit}>
              수정
            </button>
          )}
        </>
      ) : (
        <p style={style}>Loading...</p>
      )}
    </div>
  );
}
