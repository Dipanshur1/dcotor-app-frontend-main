import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Blog() {
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("undefined");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleContent = (html) => {
    setContent(html);
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreview(data.url);
    setSelectedFile(data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/blogs`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          doctorId: user?._id,
          title,
          summary,
          content,
          image: selectedFile,
        }),
      });

      const { message } = await res.json();

      if (res.status === 400) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Write Your Blog
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your blog title"
            value={title}
            onChange={handleTitle}
            required
          />
        </div>

        {/* Blog Summary */}
        <div className="mb-4">
          <label htmlFor="summary" className="block text-gray-600 mb-2">
            Summary
          </label>
          <textarea
            id="summary"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Write a brief summary of your blog"
            value={summary}
            onChange={handleSummary}
            required
          />
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-600 mb-2">
            Content
          </label>

          <ReactQuill
            value={content}
            onChange={handleContent}
            theme="snow"
            modules={modules}
            formats={formats}
            required
          />
        </div>

        {/* Blog image  */}
        <div className="mb-5 flex items-center gap-3">
          {selectedFile && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative inline-block w-[130px] h-[50px]">
            <input
              className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              id="customFile"
              name="photo"
              type="file"
              accept=".jpg,.png"
              placeholder="Upload Profile"
              onChange={handleFileInputChange}
              required
            />

            <label
              className="custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              htmlFor="customFile"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default Blog;
