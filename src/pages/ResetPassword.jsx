import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader";


function ResetPassword() {
  const [newPassword, setPassword] = useState({
    password: "",
    rePassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {id, token} = useParams();

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 12) {
      toast.error("Password length should between 8 to 12 character !");
      return false;
    }

    return true;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword.password)) {
      return;
    }

    if(newPassword.password !== newPassword.rePassword){
        toast.error("Password does't match")
        return
    }
    setLoading(true)
    try {
        const res = await fetch(`${BASE_URL}/resetpassword/${id}/${token}`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password:newPassword.password }),
        });
  
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        setLoading(false)
        toast.success(result.message);
        navigate('/login')
      } catch (e) {
        setLoading(false)
        toast.error(e.message);
      }
  };



  return (
    <section className="px-5 md:px-0">
      <div className=" w-full max-w-[570px] mx-auto rounded-lg shadow-lg md:p-10">
        <div>
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Change Your <span className="text-[#0067FF]">Password</span>
          </h3>
          <form onSubmit={handleSubmit} className="py-4 md:py-0">
            <div className="mb-5">
              <input
                type={showPassword ? "text":"password"}
                value={newPassword.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Choose your Password"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
              />
              <span className="absolute mt-5 -ml-6">
                {showPassword ? (
                  <MdVisibilityOff onClick={handleShowPassword} />
                ) : (
                  <MdVisibility onClick={handleShowPassword} />
                )}
              </span>
             
            </div>

            <div className="mb-5">
              <input
                type="password"
                value={newPassword.rePassword}
                onChange={handleInputChange}
                name="rePassword"
                placeholder="Re-enter Password"
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
              "Change Password"
            )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
