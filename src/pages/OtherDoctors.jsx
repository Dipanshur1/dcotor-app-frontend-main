import React from "react";
import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HashLoader from "react-spinners/HashLoader.js";

function OtherDoctors() {
  const { user } = useContext(AuthContext);
  const {
    data: otherDoctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/otherdoctors/${user._id}`);

  return (
    <div className="p-6">
      {!loading ? (
        otherDoctors.map((data) => (
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <>
              <div className="flex justify-center items-center">
                <img className="rounded-t-lg" src={data.photo} alt="Image" />
              </div>
              <div class="p-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                    <span>{data.name} </span>
                    <span>{data.specialization}</span>
                  </h5>
                </div>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data.bio}
                </p>
                <span className="text-white">
                  <spna className="text-[#d946ef]"> Contact:</spna> {data.email}
                </span>
              </div>
            </>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}

      {!loading && otherDoctors.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p>No Doctor Available Currently !</p>
        </div>
      )}
    </div>
  );
}

export default OtherDoctors;
