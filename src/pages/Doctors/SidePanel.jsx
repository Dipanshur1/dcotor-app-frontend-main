/* eslint-disable react/prop-types */

import { toast } from "react-toastify";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "./../../config";
import { useNavigate } from "react-router-dom";

const SidePanel = ({ ticketPrice, timeSlots, doctorId, bookedTime }) => {
  const navigate = useNavigate();
  const bookingHandler = async () => {
    if (!token()) {
      toast.error("Login Please");
      navigate("/login");
      return;
    }
    if (bookedTime === undefined || Object.keys(bookedTime).length === 0) {
      toast.error("Select Time Slot");
      return;
    }
    try {
      const doctorPromise = fetch(`${BASE_URL}/doctorappointments`, {
        method: "POST",
        body: JSON.stringify({
          doctorId: doctorId,
          selectedSlots: bookedTime,
        }),
        headers: {
          Authorization: `Bearer ${token()} `,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const stripePromise = fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "POST",
          body: JSON.stringify(bookedTime),
          headers: {
            Authorization: `Bearer ${token()} `,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const emailPromise = fetch(`${BASE_URL}/sendemail`, {
        method: "POST",
        body: JSON.stringify({
          doctorId,
          bookedTime,
        }),
        headers: {
          Authorization: `Bearer ${token()} `,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const [doctorresponsee, striperesponse, emailresponse] =
        await Promise.all([doctorPromise, stripePromise, emailPromise]);

      const doctorData = await doctorresponsee.json();
      const email = await emailresponse.json();
      const data = await striperesponse.json();
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} RS
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}:
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)}
                <span> - </span>
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="px-2 btn w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
