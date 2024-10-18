import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/ReservationView.css';

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();  
  const [depend,setDepend]=useState(false)
  
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user.email)
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
    
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
      {reservations.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Vehicle No</th>
              <th className="px-4 py-2">Mileage</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.booking_id}>
                <td className="border px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{reservation.time}</td>
                <td className="border px-4 py-2">{reservation.location}</td>
                <td className="border px-4 py-2">{reservation.vehicle_no}</td>
                <td className="border px-4 py-2">{reservation.mileage}</td>
                <td className="border px-4 py-2">{reservation.message}</td>
                <td className="border px-4 py-2"  ><button disabled={new Date(reservation.date) < new Date()} onClick={()=>{
                  
                  deleteInfo(reservation.booking_id)
                  
                  }}  className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationView;
