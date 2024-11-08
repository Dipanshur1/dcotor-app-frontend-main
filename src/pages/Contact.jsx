import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { BASE_URL, token } from "../config";
import { AuthContext } from "../context/AuthContext";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useContext(AuthContext);
  const [userData, setuserData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChangeInput = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, subject, message } = userData;
    if (email === "" || subject === "" || message === "") {
      toast.error("Provide all field");
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error("Enter Valid Email");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          ...userData,
        }),
        headers: {
          Authorization: `Bearer ${token()} `,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      toast.success(result.message);
    } catch (e) {
      console.log(e);
    }

    setuserData({
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center ">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label ">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form__input mt-1"
              placeholder="example@gmail.com"
              required
              onChange={handleChangeInput}
              value={userData.email}
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label ">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form__input  mt-1"
              placeholder="Let us know how we can help you"
              required
              onChange={handleChangeInput}
              value={userData.subject}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="form__input  mt-1"
              placeholder="Leave a comment..."
              onChange={handleChangeInput}
              value={userData.message}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn  rounded  sm:w-fit "
            onClick={handleSubmit}
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
