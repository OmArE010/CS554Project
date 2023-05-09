import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import { useSelector } from "react-redux";

function GameList (props) {
    const user = useSelector((state) => state.user);
    console.log(user);
    const [gameData, setGameData] = useState(undefined);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setError(false);
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`http://localhost:4000/selling/${user.username}`);
                console.log(data);
                setGameData(data);
                setLoading(false);
            }catch(e){
                console.log(e);
                setError(true);
            }
        }
        fetchData();
      }, [])

      console.log(gameData);

      if(error){
        return (
          <div>
            <h1>404 ERROR: NOT FOUND</h1>
          </div>
        )
      }
    
      if(loading){
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        )
      }

    if(gameData){
        let img;
        return (
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 g-4">
            {gameData.map((game) => {
                // if(game.background_image){
                //     img = game.background_image;
                // }
              return (
                <div className='col-sm-6' key={game.id}>
                    <div className="card" styles="width: 18rem;">
                        <div className="card-body">
                            <h5 className="card-title">{game.gameName ? game.gameName : 'No name Available'}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{`Price: ${game.price}`}</li>
                                <li className="list-group-item">{`Condition: ${game.condition}`}</li>
                                <li className="list-group-item">{`Location: ${game.location}`}</li>
                            </ul>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non" onClick={() => {navigate(`/game/${game.gameId}`)}}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
          </div>
        )
      }
}


export default GameList;