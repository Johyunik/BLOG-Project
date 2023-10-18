// Edit.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Edit({ user }) {
  const color = {
    color: "white",
  };
  const imgStyle = {
    width: "200px",
    height: "200px",
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const boards = JSON.parse(localStorage.getItem("boards")) || [];

  const [postToEdit, setPostToEdit] = useState(null);
  // setup states for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    const postFound = boards.find((board) => board.id === Number(id));

    if (postFound) {
      setPostToEdit(postFound);
      setTitle(postFound.title);
      setContent(postFound.text);
      setImagePreviewUrl(postFound.image);
    }
  }, [id]);

  if (!postToEdit) return null;

  // destructure the post object
  const { title: oldTitle, text: oldText, image: oldImage } = postToEdit;

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
    if (!window.confirm("게시글을 수정하시겠습니까?")) {
      return;
    }

    // find the index of the post in the array
    var indexToUpdate;
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === Number(id)) {
        indexToUpdate = i;
        break;
      }
    }

    // create a new post object with updated data
    var updatedPost = {
      id: Number(id),
      name: user.name,
      title: title,
      text: content,
    };

    if (imageFile) {
      updatedPost.image = imagePreviewUrl;
    }

    let newBoards = [...boards];

    newBoards[indexToUpdate] = updatedPost;

    localStorage.setItem("boards", JSON.stringify(newBoards));

    navigate("/Profile", { state: { post: null } });

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
      <label style={color}>썸네일 이미지</label>
      <input type="file" onChange={handleImageChange} />
      {imagePreviewUrl && (
        <img style={imgStyle} src={imagePreviewUrl} alt="preview" />
      )}
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
      <button onClick={handleSave}>수정하기</button>
    </div>
  );
}

export default Edit;
