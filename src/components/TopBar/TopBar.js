import React from 'react';
import petPicture from '../../assets/images/pet-row.png';
import "./TopBar.css"

const TopBar = (props) => {
  return (
    <div className="center-align">
      <img className="responsive-img" src={petPicture} alt="Dog and Cat Picture"/>
      <h1>Pet Poll</h1>
      <p className="flow-text">Vote for your favorite pet from the dropdown below.</p>
    </div>
  )
}

export default TopBar;