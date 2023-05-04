import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import SearchGame from './SearchGame';
import GameDetails from './GameDetails';

function GameList () {
    let {pagenum} = useParams();
    const [gameData, setGameData] = useState(undefined);
    const [page, setPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1)
    const [disable, setDisable] = useState(false);
    const [searchDisable, setSearchDisable] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(parseInt(pagenum));
        setError(false);
        const fetchData = async () => {
            if(searchTerm){
                try{
                    const { data } = await axios.get(`http://localhost:4000/games/search/${searchPage}/${searchTerm}`);
                    console.log(searchTerm);
                    setSearchData(data.results);
                    console.log(searchData);
                }catch(e){
                    console.log(e);
                }
                try{
                    const { data } = await axios.get(`http://localhost:4000/games/search/${searchPage + 1}/${searchTerm}`);
                    setSearchDisable(false);
                }catch(e){
                    setSearchDisable(true);
                }
            }
            else{
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
        }
        fetchData();
      }, [page, pagenum, searchTerm, searchPage])

        const searchValue = (value) => {
            setSearchTerm(value);
        }


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

      if(searchData && searchTerm != ''){
        console.log(searchTerm);
        let img;
        return (
          <div>
            <br/>
            <SearchGame searchValue={searchValue}/>
            <br/>
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {searchPage === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${searchPage-1}`} onClick={()=>(setSearchPage(searchPage - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{searchPage}</span>
                </li>
                <li class="page-item">
                {searchDisable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${searchPage+1}`} onClick={()=>(setSearchPage(searchPage + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
            <br/>
            <br/>
            {searchData.map((game) => {
                if(game.background_image){
                    img = game.background_image;
                }
              return (
                <div className='col-sm-6'>
                    <div className="card" styles="width: 18rem;">
                        <img src={img} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{game.name ? game.name : 'No name Available'}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Rating: {game.rating}</li>
                                <li className="list-group-item">ESRB Rating: {game.esrb_rating ? game.esrb_rating.name : "No Rating"}</li>
                                <li className="list-group-item">{game.genres.map((genre) => {
                                    return <p styles="display:inline;">{genre.name}</p>
                                })}</li>
                            </ul>
                            <button className="btn btn-primary" onClick={() => navigate(`/game/${game.id}`)}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {searchPage === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${searchPage-1}`} onClick={()=>(setSearchPage(searchPage - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{page}</span>
                </li>
                <li class="page-item">
                {searchDisable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${searchPage+1}`} onClick={()=>(setSearchPage(searchPage + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
          </div>
        )
      }

    //   else if(gameData){
    else{
        let img;
        return (
          <div>
            <br/>
            <SearchGame searchValue={searchValue}/>
            <br/>
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{page}</span>
                </li>
                <li class="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
            {/* {page === 1 ? null : <Link to={`/games/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='btn btn-primary'>Prev</button></Link>}
            <span>     Page     </span>
            {disable === true ? null : <Link to={`/games/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='btn btn-primary'>Next</button></Link>} */}
            <br/>
            <br/>
            {gameData.map((game) => {
                if(game.background_image){
                    img = game.background_image;
                }
              return (
                <div className='col-sm-6'>
                    <div className="card" styles="width: 18rem;">
                        <img src={img} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{game.name ? game.name : 'No name Available'}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Rating: {game.rating}</li>
                                <li className="list-group-item">ESRB Rating: {game.esrb_rating ? game.esrb_rating.name : "No Rating"}</li>
                                <li className="list-group-item">{game.genres.map((genre) => {
                                    return <p styles="display:inline;">{genre.name}</p>
                                })}</li>
                            </ul>
                            <button className="btn btn-primary" onClick={() => navigate(`/game/${game.id}`)}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/games/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{page}</span>
                </li>
                <li class="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/games/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
          </div>
        )
      }
}

// <div className='card' key={game.id}>
                //   <div className='card-body'>
                //     <Link to={`/game/${game.id}`}>
                //       <h5>{game.name}</h5>
                //       <br/>
                //       <img alt='character' src={img}/>
                //     </Link>
                //     {/* <br/>
                //     <p>Comics: {character.comics.available}</p>
                //     <p>Series: {character.series.available}</p>
                //     <p>Stories: {character.stories.available}</p>
                //     <br/>
                //     {found ? <button className='btn btn-danger' onClick={() => removeChar()}>Give Up</button> : collected.length === 10 ? <button className='btn btn-primary' onClick={() => alert("Maximum Collection Reached")}>Collect</button> : <button className='btn btn-primary' onClick={() => dispatch(actions.collectChar(collectorId, {id: character.id, name: character.name}))}>Collect</button>} */}
                //   </div>
                // </div>
              //)

export default GameList;