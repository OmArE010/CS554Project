import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.js';
import { getSelling } from '../../../backend/data/user.js';

function BuyModal() {
    const [sellers, setSellers] = useState([]);
    const gameId = 3894;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let game = await axios.post(`http://localhost:4000/games/sell`, { gameId, gameName: 'Grand Theft Auto' });
        console.log(game);
    }

    useEffect(() => {
        const fetchSellers = async () => {
            const response = await axios.get(`http://localhost:4000/games/selling/${gameId}`);
            setSellers(response.data);
        }
        fetchSellers();
    }, [gameId]);

    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>I am confirming my purchase</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancel</button>
                        <button type="button" className="btn btn-primary">Confirm</button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Selling:</label>
                        <select className="form-select" aria-label="Default select example" required>
                            <option value="">Open this select menu</option>
                            {sellers.map((seller) => (
                                <option key={seller.username} value={seller.username}>{seller.firstname} {seller.lastname}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyModal;
