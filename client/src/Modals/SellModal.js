import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.js';

function SellModal() {
    let prices = [];
    for (let i = 0; i <= 100; i += 10){
        prices.push(i);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let game = await axios.post(`http://localhost:4000/games/sell`, {gameId: 3894, gameName: 'Grand Theft Auto'});
        console.log(game);
    }
    return (
    <div className="modal fade" id="sellModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Sell Your Game!</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Price for Game:</label>
                    <select className="form-select" aria-label="Default select example" required>
                    <option value="">Open this select menu</option>
                    {prices.map((i) => {
                                    return <option key={i}>{'$' + i}</option>
                                })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Condition of Game:</label>
                    <select className="form-select" aria-label="Default select example" required>
                    <option value="">Open this select menu</option>
                    <option value="1">New</option>
                    <option value="2">Like New</option>
                    <option value="3">Fair</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    <input type="text" className="form-control" id="recipient-name" required/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">List Game</button>
                </div>
                </form>
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">List Game</button>
            </div> */}
            </div>
        </div>
    </div>
    )
}

export default SellModal;