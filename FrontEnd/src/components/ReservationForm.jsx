import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import '../styles/ReservationForm.css';

const ReservationForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    vehicle_no: "",
    mileage: "",
    message: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        ...formData,
        username: user.name || "",
        email: user.email,
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (isAuthenticated) {
      let date1 = new Date(formData.date);
      let date2 = new Date();
      if (date1 > date2) {
        if (date1.getDay() === 0) {
          alert("Sunday is not a working day");
        } else {
          const response = await axios.post(
            "http://localhost:5000/reservation",
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          alert(response.data);
          navigate('/view');
        }
      } else alert("Enter Valid Date");
    } else {
      alert("Please Login");
    }
  };

  const sriLankaDistricts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", 
    "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", 
    "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", 
    "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  return (
    <div className="reservation-form-container">
      <h2 className="reservation-form-title">Booking Form</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="time">Time</label>
          <select
            name="time"
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="10AM">10AM</option>
            <option value="11AM">11AM</option>
            <option value="12PM">12PM</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <select
            name="location"
            onChange={handleChange}
            className="form-input"
            required
          >
            {sriLankaDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vehicle_no">Vehicle No</label>
          <input
            name="vehicle_no"
            type="text"
            placeholder="Vehicle No"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mileage">Mileage</label>
          <input
            name="mileage"
            type="number"
            placeholder="Mileage"
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            name="message"
            required
            placeholder="Message"
            onChange={handleChange}
            className="form-input"
          ></textarea>
        </div>

        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
