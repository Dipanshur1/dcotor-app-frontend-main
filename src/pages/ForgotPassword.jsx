import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader";
import { ValidateEmail } from "../utils/validateEmail";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (ValidateEmail(email) === false) {
      toast.error("Please Entered Valid email address!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/forgotpassword`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success(result.message);
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };
  return (
    <div className="max-w-[570px] mx-auto rounded-lg shadow-lg md:p-10 mt-[50px]">
      <form className="py-4 md:py-0" onSubmit={sendEmail}>
        <div className="mb-5 ">
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Your Email"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            required
          />
        </div>

        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
          >
            {loading ? (
              <HashLoader size={25} color="#fff" />
            ) : (
              "Send Link to Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
