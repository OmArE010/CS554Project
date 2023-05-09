import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import BuyModal from '../Modals/BuyModal';
import SellModal from '../Modals/SellModal';

  const GameDetails = (props) => {
    const [showSellModal, setShowSellModal] = useState(false);
    const [showBuyModal, setBuyModal] = useState(false);
    const [gameData, setGameData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copies, setCopies] = useState(undefined);
    // const classes = useStyles();
    let {id} = useParams();
    const navigate = useNavigate();
  
   
  
    useEffect(() => {
        console.log(id);
        console.log('SHOW useEffect fired');
        setShowSellModal(true);
        setBuyModal(true);
        async function fetchData() {
        try{
            const {data} = await axios.get(`http://localhost:4000/games/copies/${id}`);
            setCopies(data);
        }catch(e){
            setError(true);
            console.log(e);
        }
        try {
          const {data} = await axios.get(`http://localhost:4000/games/game-details/${id}`);
          window.scroll({top: 0});
          setGameData(data);
          setLoading(false);
        } catch (e) {
          setError(true)
          console.log(e);
        }
      }
      fetchData();
    }, [id, showSellModal, showBuyModal, copies]);

    const handleOpenModal = () => {
        setShowSellModal(true);
    }

  useEffect(() => {
    console.log(id);
    console.log("SHOW useEffect fired");
    setShowSellModal(true);
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/games/copies/${id}`
        );
        setCopies(data._eventsCount);
        console.log(copies);
      } catch (e) {
        setError(true);
        console.log(e);
      }
      try {
        const { data } = await axios.get(
          `http://localhost:4000/games/game-details/${id}`
        );
        window.scroll({ top: 0 });
        setGameData(data);
        setLoading(false);
        console.log(data);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
    fetchData();
  }, [id, showSellModal]);


  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h2>404: NO DATA</h2>
      </div>
    );
  }

      let img;
      {gameData.background_image ? img = gameData.background_image : img = 'null'}
    return (
        <div>
            <div className="card mb-3">
            <div className="card-body">
            <img src={img} className="card-img-top img-thumbnail" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{gameData.name ? gameData.name : 'No name Available'}</h5>
                            <p className='card-text'>Copies Available: {copies}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{gameData.rating === 0 ? "Rating: N/A" : `Rating: ${gameData.rating}`}</li>
                                <li className="list-group-item">{gameData.description_raw ? gameData.description_raw : `No description available`}</li>
                                <li className="list-group-item">ESRB Rating: {gameData.esrb_rating ? gameData.esrb_rating.name : "No Rating"}</li>
                                <li className="list-group-item">{gameData.genres.map((genre) => {
                                    return <p styles="display:inline;" key={genre.name}>{genre.name}</p>
                                })}</li>
                                <li className="list-group-item">{gameData.metacritic_url ? <Link to={gameData.metacritic_url}> Metacritic Website </Link> : 'No Metacritic Link'}</li>
                                <li className="list-group-item">{gameData.website ? <Link to={gameData.website}> Game Website </Link> : 'No Website Link'}</li>
                            </ul>
                        </div>
                        <button className="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#buyModal" disabled={copies == 0}>
                            Buy Game
                        </button>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sellModal">
                            Sell Game
                        </button>
                        {showSellModal ? <SellModal gameId={gameData.id} gameName={gameData.name}/> : null}
                        {showBuyModal ? <BuyModal gameId={gameData.id} gameName={gameData.name}/> : null}
            </div>
            </div>
        </div>
        
    );
        


//   const handleOpenModal = () => {
//     setShowSellModal(true);
//   };

//   if (loading) {
//     return (
//       <div>
//         <h2>Loading....</h2>
//       </div>
//     );
//   } else if (error) {
//     return (
//       <div>
//         <h2>404: NO DATA</h2>
//       </div>
//     );
//   }
//   let img;
//   {
//     gameData.background_image
//       ? (img = gameData.background_image)
//       : (img = "null");
//   }
//   return (
//     <div>
//       <h1>Game Details</h1>
//       <div>
//         <h2>{gameData.name}</h2>
//         <h3>{gameData.genre}</h3>
//         <h3>{gameData.platform}</h3>
//         <h3>{gameData.releaseDate}</h3>
//         <h3>{gameData.developer}</h3>
//         <h3>{gameData.rating}</h3>
//       </div>
//       <div className="card mb-3">
//         <div className="card-body">
//           <img src={img} className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">
//               {gameData.name ? gameData.name : "No name Available"}
//             </h5>
//             <p className="card-text">Copies Available: {copies}</p>
//             <ul className="list-group list-group-flush">
//               <li className="list-group-item">
//                 {gameData.rating === 0
//                   ? "Rating: N/A"
//                   : `Rating: ${gameData.rating}`}
//               </li>
//               <li className="list-group-item">
//                 {gameData.description_raw
//                   ? gameData.description_raw
//                   : `No description available`}
//               </li>
//               <li className="list-group-item">
//                 ESRB Rating:{" "}
//                 {gameData.esrb_rating ? gameData.esrb_rating.name : "No Rating"}
//               </li>
//               <li className="list-group-item">
//                 {gameData.genres.map((genre) => {
//                   return (
//                     <p styles="display:inline;" key={genre.name}>
//                       {genre.name}
//                     </p>
//                   );
//                 })}
//               </li>
//               <li className="list-group-item">
//                 {gameData.metacritic_url ? (
//                   <Link to={gameData.metacritic_url}> Metacritic Website </Link>
//                 ) : (
//                   "No Metacritic Link"
//                 )}
//               </li>
//               <li className="list-group-item">
//                 {gameData.website ? (
//                   <Link to={gameData.website}> Game Website </Link>
//                 ) : (
//                   "No Website Link"
//                 )}
//               </li>
//             </ul>
//           </div>
//           <button
//             type="button"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal"
//           >
//             Buy Game
//           </button>
//           <button
//             type="button"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non"
//             data-bs-toggle="modal"
//             data-bs-target="#sellModal"
//           >
//             Sell Game
//           </button>
//           {showSellModal ? <SellModal /> : null}
//         </div>
//       </div>
//     </div>
//   );
};
export default GameDetails;
