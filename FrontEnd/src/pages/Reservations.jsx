import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();  
  const [depend, setDepend] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      getReservations(user.email);  
    }
  }, [depend]);  

  const getReservations = async (email) => {
    try {
      const token = await getAccessTokenSilently();  
      const response = await axios.get(`http://localhost:5000/reservations?email=${email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations', error);
    }
  };

  const deleteInfo = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this reservation?");
    if (confirmed) {
      const token = await getAccessTokenSilently();
  
      try {
        const response = await axios.delete(`http://localhost:5000/reservations?id=${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setDepend(!depend);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="reservation-view-container">
      <h2 className="reservation-view-title">Your Reservations</h2>
      {reservations.length > 0 ? (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Vehicle No</th>
              <th>Mileage</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.booking_id}>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.location}</td>
                <td>{reservation.vehicle_no}</td>
                <td>{reservation.mileage}</td>
                <td>{reservation.message}</td>
                <td>
                  <button
                    disabled={new Date(reservation.date) < new Date()}
                    onClick={() => deleteInfo(reservation.booking_id)}
                    className="reservation-delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationView;
