import React from "react";
import { useNavigate } from "react-router-dom";

const SearchGame = (props) => {
    const navigate = useNavigate();
    let value;

    const submitHandler = (e) => {
        console.log(e.target.value);
        navigate(`/search/1/${value}`);
}
    const handleChange = (e) => {
        value = e.target.value;
        console.log(value);
    };
    // const submitHandler = (e) => {
    //     e.preventDefault();
    // }
    return (
        <form className="d-flex" role="search" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
            <button className="btn btn-outline-secondary" type="submit">Search</button>
        </form> 
    );
};

export default SearchGame;