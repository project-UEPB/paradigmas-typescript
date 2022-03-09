/* eslint-disable */
/* eslint linebreak-style: ["error", "windows"] */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/index';
import ScoreScreen from './screens/ScoreScreen/index';
import { ContainerBatalha } from  './components/containerBatalha';
import UserContext from './UserContext';

const initialInfo = {
  name: '',
  campSize: 12,
}

export const App = () => {
  const [info, setInfo] = useState(initialInfo);
  
  return (
    <>
      <UserContext.Provider value={[info, setInfo]} >
        <Router>
          <Routes>
            <Route element={<HomeScreen/>} path="/" />
            <Route element={<ContainerBatalha />} path="/game" />
            <Route element={<ScoreScreen/>} path="/score" />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
};
