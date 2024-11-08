import { BASE_URL } from "./../../config";

import DoctorCard from "./../../components/Doctors/DoctorCard";
import useFetchData from "./../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";

const MyBookings = () => {
  const {
    data: myAppointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
            {error}
          </h3>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {myAppointments?.map((doctor) => (
            <DoctorCard
              doctor={doctor.doctor}
              key={doctor.id}
              booked={true}
              bookingTime={doctor.bookingTime}
            />
          ))}
        </div>
      )}
      {!loading && myAppointments.length === 0 && (
        <p className="text-center mt-4 text-red-500">No Appointment Booked</p>
      )}
    </div>
  );
};

export default MyBookings;
