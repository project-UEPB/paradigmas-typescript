/* eslint-disable react/button-has-type */
import React from 'react';

export const Botao = ({
  text, onClick, active = '', title = '', disabled = false,
}) => (
  <button
    className={`${active} ${disabled && 'btn-block'}`}
    onClick={onClick}
    title={title}
  >
    {text}
  </button>
);
