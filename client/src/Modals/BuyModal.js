import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.js';
import { useSelector } from "react-redux";


function BuyModal(props) {
    const[prices, setPrices] = useState(undefined);
    const user = useSelector((state) => state.user);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();
    //let prices;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`http://localhost:4000/get-prices/${user.username}/${props.gameId}`);
                console.log(data);
                setPrices(data);
                console.log(prices);
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
      }, []);

      console.log(Array.isArray(prices));

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if (user.loggedIn) {
                alert("Your have purchased your game!");
            }
            else{
                alert("Must be logged in to list a game");
                setError(true);
                navigate(`/login`);
            }
        }catch(e){
            alert(e);
        }
    }
    return (
        <div className="modal fade" id="buyModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Your Purchase!</h1>
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={(e) => handleSubmit(e)}>                   
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Select Buyer:</label>
                            <select className="form-select" aria-label="Default select example" name='condition' required>
                            <option value="">Open this select menu</option>
                            {console.log('prices: ' + prices)}
                            {prices ? prices.map((i) => {
                                    return <option key={i.id}>{i.seller + ' -' + i.price}</option>
                                }) : null}
                            </select>
                        </div>
                        <button className="btn btn-primary">Chat with Buyer</button>
                        <br></br>
                        <br></br>
                        <div className="modal-footer">
                            <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200" data-bs-dismiss="modal" type='button'> Cancel</button>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non" type='submit'>Confirm</button>
                        </div>
                        </form>
                        </div>
                </div>
            </div>
        </div>

    )



}

export default BuyModal;
