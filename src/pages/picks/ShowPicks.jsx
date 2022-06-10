import React from "react";
import "./ShowPicks.scss";
import axios from "axios";
import domain from "../../util/domain";

function ShowPicks({ picks, getPicks }) {

  // DELETE PICKS
  async function deletePicks() {
    if (window.confirm("Do you want to delete your picks?"))
      await axios.delete(`${domain}/picks/${picks._id}`);

    getPicks();
  }

  return (
    <div className="show-picks-page">
      <div className="info-text">
        <h1> Your picks</h1>
      </div>
      <div className="labels">
        <p className="l-entry"> Entry </p>
        <p className="l-picks"> Picks </p>
        <p className="l-delete"> Delete </p>
      </div>
      <div className="user"></div>
      <div className="show-picks-container">
        <div className="entry-status">
          <p> Compete </p>
        </div>
        <div className="show-picks">
          {!picks ? (
            <p> Loading </p>
          ) : (
            picks.picks.map((item, index) => {
              return (
                <div className="show-pick" key={index}>
                  <img src={`../mlb-icons/${item}.svg`} className="show-logo" alt="" />
                </div>
              );
            })
          )}
        </div>
        <div className="delete-picks">
          <button className="delete-btn" onClick={deletePicks}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowPicks;
