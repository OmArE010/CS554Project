import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.js";
import { useSelector } from "react-redux";

function SellModal(props) {
    const user = useSelector((state) => state.user);
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    let prices = [];
    for (let i = 0; i <= 100; i += 10){
        prices.push(i);
    }

    const handleSubmit = async (e) => {
        try{
          if (user.loggedIn) {
            e.preventDefault();
            let game = await axios.post(`http://localhost:4000/games/sell`, {username: props.username, gameId: props.gameId, gameName: props.gameName, price: e.target.price.value, 
            condition: e.target.condition.value, location: e.target.location.value});
            let user = await axios.post(`http://localhost:4000/user/update-user`, {username: props.username, gameId: props.gameId, gameName: props.gameName, price: e.target.price.value, 
            condition: e.target.condition.value, location: e.target.location.value});
            console.log(game);
            alert("Your game is now being sold!");
            }else {
                setError(true);
                navigate(`/login`);
            }
        }catch(e){
            alert(e);
        }
  };

  return (
    <div
      className="modal fade"
      id="sellModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {!user.loggedIn && (
            <div
              class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
              role="alert"
            >
              <span class="font-medium">Warning!</span> Must be logged in to
              list a game!
            </div>
          )}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Sell Your Game! {user.loggedIn}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Price for Game:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="">Open this select menu</option>
                  {prices.map((i) => {
                    return <option key={i}>{"$" + i}</option>;
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Condition of Game:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="">Open this select menu</option>
                  <option value="1">New</option>
                  <option value="2">Like New</option>
                  <option value="3">Fair</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non"
                >
                  List Game
                </button>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer">
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Price for Game:</label>
                    <select className="form-select" aria-label="Default select example" name='price' required>
                    <option value="">Open this select menu</option>
                    {prices.map((i) => {
                                    return <option key={i}>{'$' + i}</option>
                                })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Condition of Game:</label>
                    <select className="form-select" aria-label="Default select example" name='condition' required>
                    <option value="">Open this select menu</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Fair">Fair</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    <input type="text" className="form-control" id="recipient-name" name='location' required/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">List Game</button>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">List Game</button>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default SellModal;
