/* eslint-disable */
import React, { useState, useContext } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../UserContext';

const HomeScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useContext(UserContext);
  
  function toggle(value: any) {
    return !value;
  }

  function handleClickScore() {
    navigate("/score", { replace: true });
  }

  const handleShowDevTeam = () => {
    setShowModal(true);
  }

  const handleClickPlay = (event: any) => {
    const newState = { 
      name: name, 
      campSize: checked ? 16 : 12,
    };
    setContext(newState);
    
    navigate('/game', { replace: true });
  }
  
  return (
    <div className="container-jogo-home">
      {showModal && (
        <div className="modal">
          <div className="content-modal">
            <h2>Dev Team</h2>
            <span 
              className='close-modal'
              onClick={() => setShowModal(false)}
            >
              X
            </span>
            <div className="cols">
              <div className="col-1">
                <div className="card-dev">
                  <img 
                    src="https://avatars.githubusercontent.com/u/56928594?v=4" 
                    alt="João Vitor" 
                  />
                  <div className="info-card">
                    <h3>João Vitor</h3>
                    <h5>
                      Github: <a href="https://github.com/joaoo-vittor" target="_blank">@joaoo-vittor</a>
                    </h5>
                  </div>
                </div>
                <div className="card-dev">
                  <img 
                    src="https://avatars.githubusercontent.com/u/74945608?v=4" 
                    alt="José Carlos" 
                  />
                  <div className="info-card">
                    <h3>José Carlos</h3>
                    <h5>
                      Github: <a href="https://github.com/Clorein" target="_blank">@Clorein</a>
                    </h5>
                  </div>
                </div>
                <div className="card-dev">
                  <img 
                    src="https://avatars.githubusercontent.com/u/83410959?v=4" 
                    alt="Matheus Rocha" 
                  />
                  <div className="info-card">
                    <h3>Matheus Rocha</h3>
                    <h5>
                      Github: <a href="https://github.com/MatheusLSR" target="_blank">@MatheusLSR</a>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="card-dev">
                    <img 
                      src="https://avatars.githubusercontent.com/u/55154107?v=4" 
                      alt="Klayton Junior" 
                    />
                    <div className="info-card">
                      <h3>Klayton Junior</h3>
                      <h5>
                        Github: <a href="https://github.com/KlaytonJr" target="_blank">@KlaytonJr</a>
                      </h5>
                    </div>
                </div>
                <div className="card-dev">
                    <img 
                      src="https://avatars.githubusercontent.com/u/76905425?v=4" 
                      alt="Lucas Henrique" 
                    />
                    <div className="info-card">
                      <h3>Lucas Henrique</h3>
                      <h5>
                        Github: <a href="https://github.com/lucashgp-dev" target="_blank">@lucashgp-dev</a>
                      </h5>
                    </div>
                  </div>
              </div>
             </div>
          </div>
        </div>
      )}
      <div className="content-home">
        <h1 className="title-home">Batalha Naval</h1>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Nome"
            className="input-nome"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="tabuleiro-um"
            checked={!checked}
            onChange={() => setChecked(toggle)}
            className="select-size-one"
          />
          <span className="select-label">12x12</span>
          <input
            type="checkbox"
            name="tabuleiro-dois"
            checked={checked}
            onChange={() => setChecked(toggle)}
            className="select-size-two"
          />
          <span className="select-label">16x16</span>
        </div>

        <div className="btn-container-home">
          <button className="full-btn" onClick={handleClickPlay}>
            JOGAR
          </button>
          <button className="full-btn" onClick={handleShowDevTeam}>
            Dev Team
          </button>
          <button className="border-btn" onClick={handleClickScore}>
            SCORE
          </button>
        </div>
      </div>
    </div>
  )   
};

export default HomeScreen;
