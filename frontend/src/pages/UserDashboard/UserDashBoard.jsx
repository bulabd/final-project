import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './UserDashboard.css';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();

  useEffect(() => {
    getUserData()
  }, []);

  async function getUserData() {
    const userId  = cookies.idCookie;
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/user/${userId}`);

    setUser(data);

  }

  if(!user) {
    <h1>loading...🤨</h1>
  }

  return(

    <main>
    <div className="user-dashboard-wrapper">
        <h4>Username, {cookies.emailCookie}</h4>
      <div>
        {/* Image below can be made into an editable button with a hover */}
        <img src={user?.avatar} alt="User Avatar" height={250} width={250} className="user-avatar"/>
      </div>
      <p className='bio'><b>User Bio:</b> <i>{user?.bio}</i></p>
    {/* User Ratings  and Comments go here  */}
    <article><>...Playlists</></article>
    <article><>...Comments</></article> 
    <article><>...Ratings</></article>
    </div>
    </main>
  );
};