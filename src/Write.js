import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import "./CSS/Write.css";

function Write({ user }) {
  const color = {
    color: "white",
  };
  const imgStyle = {
    width: "200px",
    height: "200px",
  };

  const { name } = user || {};
  const [board, setBoard] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null); // 새로운 상태 변수 추가
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 새로운 상태 변수 추가

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImageFile(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!window.confirm("게시글을 작성하시겠습니까?")) {
      return;
    }

    const post = {
      id: Date.now(),
      name: name,
      title: title,
      text: content,
      // image:
      //   "https://blog.kakaocdn.net/dn/CjvI2/btqOYuraun4/k2x9rRmMx1lV8DRqVUqW1K/img.png", // 이미지 정보 추가
    };

    if (imageFile) {
      post.image = imagePreviewUrl;
    }

    // addPost(post);

    // setBoard([...board, post]);
    navigate("/", { state: { post } });

    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreviewUrl("");
  };

  return (
    <div>
      <input
        type="text"
        id="header"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {/* 이미지 업로드 */}
      <label style={color}>썸네일 이미지</label>
      <input type="file" onChange={handleImageChange} />
      {imagePreviewUrl && (
        <img style={imgStyle} src={imagePreviewUrl} alt="preview" />
      )}
      {/* 이미지 업로드 */}

      {/* 에디터 */}
      <CKEditor
        className="custom-editor"
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        config={{
          height: 1000,
          ckfinder: {
            uploadUrl: "/your-image-upload-endpoint",
          },
        }}
      />
      {/* 에디터 */}

      <button onClick={handleSave}>작성하기</button>
    </div>
  );
}

export default Write;
