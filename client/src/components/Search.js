import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import GameDetails from './GameDetails';


const Search = (props) => {
    const [searchPage, setSearchPage] = useState(1);
    const [searchDisable, setSearchDisable] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const navigate = useNavigate();
    const { page } = useParams();
    const { search } = useParams();
    console.log(page);
    console.log(search);

    useEffect(() => {
        setError(false);
        setSearchPage(parseInt(page));
        const fetchData = async () => {
                try{
                    const { data } = await axios.get(`http://localhost:4000/games/search/${searchPage}/${search}`);
                    setSearchData(data.results);
                    console.log(searchData);
                }catch(e){
                    console.log(e);
                }
                try{
                    const { data } = await axios.get(`http://localhost:4000/games/search/${searchPage+1}/${search}`);
                    setSearchDisable(false);
                }catch(e){
                    setSearchDisable(true);
                }
        }
        fetchData();
      }, [page, searchPage])
    
      if(searchData){
        let img;
        return (
          <div>
            <br/>
            <br/>
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {searchPage === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/search/${searchPage-1}/${search}`} onClick={()=>(setSearchPage(searchPage - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{searchPage}</span>
                </li>
                <li class="page-item">
                {searchDisable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/search/${searchPage+1}/${search}`} onClick={()=>(setSearchPage(searchPage + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
            <br/>
            <br/>
            <div class="row row-cols-1 row-cols-md-2 g-4">
            {searchData.map((game) => {
                if(game.background_image){
                    img = game.background_image;
                }
              return (
                <div className='col-sm-6'>
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
                                    return <p styles="display:inline;">{genre.name}</p>
                                })}</li>
                            </ul>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none" onClick={() => navigate(`/game/${game.id}`)}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
            <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                {searchPage === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/search/${searchPage-1}/${search}`} onClick={()=>{(setSearchPage(searchPage - 1)); window.scroll({top: 0});}} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li class="page-item active" aria-current="page">
                <span class="page-link">{searchPage}</span>
                </li>
                <li class="page-item">
                {searchDisable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/search/${searchPage+1}/${search}`} onClick={()=>{(setSearchPage(searchPage + 1)); window.scroll({top: 0});}}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
          </div>
        )
      }
};

export default Search;