import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.js';


function BuyModal(props) {
    const[prices, setPrices] = useState(undefined);
    //let prices;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`http://localhost:4000/user/get-prices/${props.username}/${props.gameId}`);
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
    // const getData = async () => {
    //     let { data } = await axios.get(`http://localhost:4000/user/get-prices/omare/${props.gameId}`);
    //     //setPrices(data);
    //     prices = data;
    //     console.log('price: ' + prices);
    // }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            // let game = await axios.post(`http://localhost:4000/games/sell`, );
            // let user = await axios.post(`http://localhost:4000/user/update-user`, );
            //console.log(game);
            alert("Your game is now being sold!");
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancel</button>
                            <button type="button" className="btn btn-primary">Confirm</button>
                        </div>
                        </form>
                        </div>
                </div>
            </div>
        </div>

    )



}

export default BuyModal;
