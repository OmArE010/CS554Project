import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.js";
import { useSelector } from "react-redux";
import io from "socket.io-client";

function BuyModal(props) {
  const currentUser = useSelector((state) => state.user);
  let navigate = useNavigate();
  const axiosRef = useRef(axios);
  const socketRef = useRef();
  const [sendTo, setSendTo] = useState("");
  const [error, setError] = useState(false);
  const [seller2, setSeller2] = useState(undefined);

  const [prices, setPrices] = useState(undefined);
  //let prices;

  useEffect(() => {
    socketRef.current = io("/");
    const fetchData = async () => {
      try {
        let { data } = await axios.get(`http://localhost:4000/get-seller/${props.gameId}`);
        data = data.flat(1);
        let data2 = data;
        console.log(data);


        // for(let i = 0; i < data2.length; i ++){
        //     console.log(i);
        //     console.log(data[i]);
        //     if(data[i].seller == 'omare'){
        //         data.splice(data[i], 1); 
        //     }
        // }

        setPrices(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      socketRef.current.disconnect();
    };
  }, [props.gameId]);

  console.log(prices);

  const onMessageSubmit = async (e) => {
    try {
      e.preventDefault();
      let seller = await axios.post(`http://localhost:4000/user/get-user`, {
        username: sendTo,
      });
      let msgEle = document.getElementById("message");
      axiosRef.current.defaults.url = window.location.href;
      const { data } = await axios.post(`http://localhost:4000/messages`, {
        sender: currentUser,
        message: msgEle.value,
        receiver: seller,
      });
      msgEle.value = "";
      msgEle.focus();
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (currentUser.loggedIn) {
        // console.log(e.target.condition);
        // let game = await axios.post(`http://localhost:4000/buy-game`, {username: sendTo, gameId: e.target.condition.value});
        alert("Your have bought your game!");
      } else {
        navigate(`/login`);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div
      className="modal fade"
      id="buyModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-10">
          {!currentUser.loggedIn && (
            <div
              class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
              role="alert"
            >
              <span class="font-medium">Warning!</span> Must be logged in to buy
              a game!
            </div>
          )}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Confirm Your Purchase!
            </h1>
            <h5 className="modal-title"></h5>
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
                <label htmlFor="message-text" className="col-form-label">
                  Select Buyer:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="condition"
                  required
                  onChange={(e) => setSendTo(e.target.value)}
                >
                  <option value="">Open this select menu 1</option>
                  <option value="Jack">Jack</option>
                  {console.log("prices: " + prices)}
                  {prices
                    ? prices.map((i) => {
                        return (
                         i.seller !== currentUser.username ? <option key={i.id} value={i.id}>
                            {i.seller + " -" + i.price}
                          </option> : null
                        );
                      })
                    : null}
                </select>
              </div>
              {sendTo && (
                <div className="send-box text-left fixed flex">
                  <label for="message" className="message-label">
                    Type a message
                  </label>
                  <input
                    name="message"
                    id="message"
                    variant="outlined"
                    placeholder="Type a message..."
                    className="block"
                  />
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    onClick={(e) => onMessageSubmit(e)}
                  >
                    Chat with Buyer
                  </button>
                </div>
              )}

              <br></br>
              <br></br>
              <div className="modal-footer mt-5">
                <button
                  type="button"
                  class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  data-bs-dismiss="modal"
                >
                  {" "}
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;
