import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import SellModal from '../Modals/SellModal';

  const GameDetails = (props) => {
    const [gameData, setgameData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const classes = useStyles();
    let {id} = useParams();
  
   
  
    useEffect(() => {
      console.log('SHOW useEffect fired');
      async function fetchData() {
        try {
          const {data: game} = await axios.get(`http://localhost:4000/games/${id}}`);
          setEventData(game);
          setLoading(false);
          console.log(game);
        } catch (e) {
          setError(true)
          console.log(e);
        }
      }
      fetchData();
    }, [id]);

    if (loading) {
        return (
          <div>
            <h2>Loading....</h2>
          </div>
        );
      } 
       else if(error){
        return (
          <div>
            <h2>404: NO DATA</h2>
          </div>
        ); 
      }
    return (
        <div>
            <h1>Game Details</h1>
            <div>
                <h2>{gameData.name}</h2>
                <h3>{gameData.genre}</h3>
                <h3>{gameData.platform}</h3>
                <h3>{gameData.releaseDate}</h3>
                <h3>{gameData.developer}</h3>
                <h3>{gameData.rating}</h3>
            </div>
        </div>
    );
        







  }
export default GameDetails;
