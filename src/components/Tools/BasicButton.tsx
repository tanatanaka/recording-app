import React from 'react'
import "./BasicButton.css"

const BasicButton = ({children, onClick}: any) => {
  
  return (
      <button className='basicButton' onClick={onClick}>
        {children}
      </button>
  );
}

export default BasicButton;
