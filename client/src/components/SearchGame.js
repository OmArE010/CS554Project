import React from "react";

const SearchGame = (props) => {
    const handleChange = (e) => {
        let value = e.target.value;
        props.searchValue(value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <form method='POST' name="formName" onSubmit={submitHandler}>
            <label>
                Search Term:
                <input type='text' name='searchTerm' onChange={handleChange}/>
            </label>
        </form>
    );
};

export default SearchGame;