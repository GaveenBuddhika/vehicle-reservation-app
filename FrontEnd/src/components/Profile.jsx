import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`http://localhost:5000/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserInfo(response.data);
  }

  return (
    <span>
      {isAuthenticated ? (
        <div className="profile-container">
          <div className="profile-card">
            <img
              src={userInfo.picture}
              alt={userInfo.name}
              className="profile-picture"
            />
            <h2 className="profile-name">{userInfo.name}</h2>
            <p className="profile-detail">Email: {userInfo.email}</p>
            <p className="profile-detail">Nick Name: {userInfo.nickname}</p>
          </div>
        </div>
      ) : (
        <div>Please authenticate</div>
      )}
    </span>
  );
};

export default Profile;
