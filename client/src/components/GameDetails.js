import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../App.css';
import SellModal from '../Modals/SellModal';

function GameDetails () {
    const [showSellModal, setShowSellModal] = useState(false);

    useEffect(() => {
        setShowSellModal(true);

    },[showSellModal])

    const handleOpenModal = () => {
        setShowSellModal(true);
    }

    return(
        <div>
            <br/>
            <br/>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleOpenModal()}>
              Launch demo modal
            </button>
            {showSellModal ? <SellModal/> : null}
        </div>
    );
};

export default GameDetails;