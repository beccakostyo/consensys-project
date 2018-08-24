import React from 'react';
import petPicture from '../../assets/images/pet-row.png';
import "./TopBar.css"

const TopBar = (props) => {
  return (
    <div className="top-div">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <img className="img-fluid" src={petPicture} alt="Dog and Cat" />
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="display-3">Pet Poll</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4>Vote for your favorite pet from the dropdown below.</h4>
        </div>
      </div>
    </div >
  )
}

export default TopBar;