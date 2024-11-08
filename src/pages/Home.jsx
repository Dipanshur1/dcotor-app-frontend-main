import { Link, NavLink, useNavigate } from "react-router-dom";
import heroImg01 from "../assets/images/local1.png";
import heroImg02 from "../assets/images/local2.avif";
import heroImg03 from "../assets/images/local3.jpeg";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import About from "../components/About/About.jsx";
import faqImg from "../assets/images/Ali.jpeg";
import { BsArrowRight } from "react-icons/bs";

import ServicesList from "../components/Services/ServicesList";
import featureImg from "../assets/images/local1.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import DoctorsList from "../components/Doctors/DoctorsList";
import Testimonial from "../components/Testimonial/Testimonial";
import FaqList from "../components/Faq/FaqList";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";

const Home = () => {
  const { user, role } = useContext(AuthContext);
  const [reviewMessage, setReviewMessage] = useState();
  const navigate = useNavigate();

  const handleReviewMessage = (e) => {
    setReviewMessage(e.target.value);
  };

  const handlePublishReview = async () => {
    if (reviewMessage.length < 1) {
      return toast.error("message can't be empty");
    }
    try {
      const res = await fetch(`${BASE_URL}/appreviews`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          message: reviewMessage,
        }),
      });
      const { success, message } = await res.json();
      console.log(message);

      if (success === true) {
        toast.success(message);
      }
      setReviewMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ====== hero content ========== */}
            <div>
              <div className=" lg:w-[570px]">
                <h1 className="text-headingColor text-[36px] leading-[46px] md:text-[60px] md:leading-[70px] font-[800] ">
                  We help patients live a healthy, longer life.
                </h1>
                <p className="text__para">
                  Our Doctor Appointment App is designed with one goal in mind:
                  to empower patients to take control of their health journey.
                  By streamlining the appointment booking process, we ensure
                  that patients can access timely medical care and guidance.
                </p>

                {role !== "doctor" && (
                  <button onClick={() => navigate("/doctors")} className="btn">
                    Request an Appointment{" "}
                  </button>
                )}
              </div>

              <div className="mt-[30px] lg:mt-[70px] flex flex-col md:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-yellowColor block mt-[-14px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-purpleColor block mt-[-14px]"></span>
                  <p className="text__para">Clinic Location</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-irisBlueColor block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* =========== hero img ============ */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="hero_img" />
              </div>
              <div className="mt-[30px]">
                <img
                  className="w-full mb-[30px]"
                  src={heroImg02}
                  alt="hero_img"
                />
                <img className="w-full" src={heroImg03} alt="hero_img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {role !== "doctor" && (
        <section>
          <div className="container ">
            <div className="lg:w-[470px] mx-auto">
              <h2 className="heading text-center">
                Providing the best medical services
              </h2>
              <p className="text__para text-center">
                World-class care for everyone. Our health System offers
                unmatched, expert health care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
              <div className="py-[30px] px-5 ">
                <div className="flex items-center justify-center">
                  <img src={icon01} alt="" />
                </div>

                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Find a Doctor
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Discover a wide network of experienced healthcare
                    professionals, ensuring you can find the perfect doctor to
                    address your specific needs.
                  </p>

                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>

              <div className="py-[30px] px-5 ">
                <div className="flex items-center justify-center">
                  <img src={icon02} alt="" />
                </div>

                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Find a Location
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Locate healthcare facilities near you with ease, making it
                    convenient to access medical services wherever you are.
                  </p>

                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
              <div className="py-[30px] px-5 ">
                <div className="flex items-center justify-center">
                  <img src={icon03} alt="" />
                </div>

                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Book Appointment
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Effortlessly schedule appointments at your preferred time,
                    so you can prioritize your health without the hassle.
                  </p>

                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <About />

      {role !== "doctor" && (
        <section>
          <div className="container">
            <div className="xl:w-[470px] mx-auto">
              <h2 className="heading text-center">Our medical services</h2>
              <p className="text__para text-center">
                World-class care for everyone. Our health System offers
                unmatched, expert health care.
              </p>
            </div>

            <ServicesList />
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            {/* =========== feature content ============ */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get virtual treatment <br /> anytime.
              </h2>
              <ul className="pl-4">
                <li className="text__para ">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para ">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">
                  3. View our physicians who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>

            {/* ========= feature img ======== */}
            <div className="relative z-10  xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="about_img" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" className="w-[600px] h-[600px]" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions by our beloved patients
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <Testimonial />
          {role && (
            <div>
              <textarea
                placeholder="leave a review"
                className="resize-none border border-gray-300 rounded-md p-3 w-[40%] focus:outline-none focus:ring focus:border-blue-00"
                rows={4}
                value={reviewMessage}
                onChange={handleReviewMessage}
              />
              <br />
              <button
                onClick={handlePublishReview}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Publish
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
