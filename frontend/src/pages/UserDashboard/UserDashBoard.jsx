import React from 'react';
import './UserDashboard.css';

export default function UserDashboard() {
  return(

    <main>
    <div className="user-dashboard-wrapper">
        <h4>Username</h4>
      <div>
        {/* Image below can be made into an editable button with a hover */}
        <img src="https://share.america.gov/wp-content/uploads/2020/02/AP_20041239336571-1068x782.jpg" alt="User Avatar" height={250} width={250} className="user-avatar"/>
      </div>
      <p className='bio'><b>User Bio:</b> <i>Sustainable typewriter actually, direct trade woke prism disrupt man bun kale chips narwhal twee pug edison bulb letterpress. Palo santo jean shorts hella pok pok. Neutra semiotics wayfarers, chia hoodie vegan beard coloring book everyday carry microdosing. Four loko mlkshk humblebrag, gentrify quinoa shabby chic flexitarian williamsburg distillery ugh green juice vice. Pinterest cloud bread distillery glossier raw denim whatever knausgaard listicle praxis offal brooklyn vaporware salvia pour-over.</i></p>
    {/* User Ratings  and Comments go here  */}
    <article><>...Comments</></article> 
    <article><>...Ratings</></article>
    <article><>...Playlists</></article>
    </div>
    </main>
  );
};