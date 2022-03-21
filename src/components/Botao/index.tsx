/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';

type props = {
  text?: string;
  onClick?: () => void;
  active?: string;
  title?: string; 
  disabled?: boolean;
} 

export const Botao = ({
  text, onClick, active = '', title = '', disabled = false,
}: props) => (
  <button
    className={`${active} ${disabled && 'btn-block'}`}
    onClick={onClick}
    title={title}
  >
    {text}
  </button>
);
