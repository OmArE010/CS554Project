import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.js';

function SellModal() {
    let prices = [];
    for (let i = 0; i <= 100; i += 10){
        prices.push(i);
    }
    return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Sell Your Game!</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Price for Game:</label>
                    <select className="form-select" aria-label="Default select example">
                    <option value>Open this select menu</option>
                    {prices.map((i) => {
                                    return <option key={i}>{'$' + i}</option>
                                })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Condition of Game:</label>
                    <select className="form-select" aria-label="Default select example">
                    <option value>Open this select menu</option>
                    <option value="1">New</option>
                    <option value="2">Like New</option>
                    <option value="3">Fair</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">City:</label>
                    <input type="text" className="form-control" id="recipient-name"/>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">List Game</button>
            </div>
            </div>
        </div>
    </div>
    )
}

export default SellModal;