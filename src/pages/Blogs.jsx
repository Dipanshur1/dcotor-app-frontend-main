import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader.js";
import useFetchData from "../hooks/useFetchData";

function Blogs() {
  const { role } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/blogs`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      setBlogs(data);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between m-4">
      <div className="flex flex-wrap justify-center gap-8 ">
        {!loading ? (
          blogs.map((data, index) => (
            <Link to={`/blogs/${data._id}`}>
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow  w-[400px] h-[500px] ">
                <a href="#">
                  <img
                    class="rounded-t-lg h-[200px] w-[100%]"
                    src={data.image}
                    alt=""
                  />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight  ">
                      {data.title.slice(0,80)}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {data.summary.slice(0,150) + " ... "}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}
      </div>
      {!loading && blogs.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p>No Blog Available</p>
        </div>
      )}

      {role === "doctor" && (
        <Link
          to="/doctor/blog"
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Generate Blog
        </Link>
      )}
    </div>
  );
}

export default Blogs;
