import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import GameDetails from './GameDetails';
import Search from './Search';
import SellModal from '../Modals/SellModal';

function GameList () {
    let {pagenum} = useParams();
    const [gameData, setGameData] = useState(undefined);
    const [page, setPage] = useState(parseInt(pagenum));
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(parseInt(pagenum));
        setError(false);
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`http://localhost:4000/games/${page}`);
                console.log(data.results);
                setGameData(data.results);
                setLoading(false);
            }catch(e){
                console.log(e);
                setError(true);
            }
            try{
                const { data } = await axios.get(`http://localhost:4000/games/${page + 1}`);
                setDisable(false);
            }catch(e){
                setDisable(true);
            }
        }
        fetchData();
      }, [page, pagenum])


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
            <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li className="page-item active" aria-current="page">
                <span className="page-link">{page}</span>
                </li>
                <li className="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
            <br/>
            <br/>
            <div class="row row-cols-1 row-cols-md-2 g-4">
            {gameData.map((game) => {
                if(game.background_image){
                    img = game.background_image;
                }
              return (
                <div className='col-sm-6' key={game.id}>
                    <div className="card" styles="width: 18rem;">
                      <Link to={`/game/${game.id}`}>
                        <img src={img} className="card-img-top" alt="..."/>
                      </Link>
                        <div className="card-body">
                            <h5 className="card-title">{game.name ? game.name : 'No name Available'}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{game.rating === 0 ? "Rating: N/A" : `Rating: ${game.rating}`}</li>
                                <li className="list-group-item">ESRB Rating: {game.esrb_rating ? game.esrb_rating.name : "No Rating"}</li>
                                <li className="list-group-item">{game.genres.map((genre) => {
                                    return <p styles="display:inline;" key={genre.name}>{genre.name}</p>
                                })}</li>
                            </ul>
                            <button className="btn btn-primary" onClick={() => navigate(`/game/${game.id}`)}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
            <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${page-1}`} onClick={()=>{(setPage(page - 1)); window.scroll({top: 0});}} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li className="page-item active" aria-current="page">
                <span className="page-link">{page}</span>
                </li>
                <li className="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${page+1}`} onClick={()=>{(setPage(page + 1)); window.scroll({top: 0});}}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
          </div>
        )
      }
}


export default GameList;