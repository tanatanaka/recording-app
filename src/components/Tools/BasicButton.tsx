import React from 'react'
import "./BasicButton.css"

const BasicButton = ({children}: any) => {
  
  return (
      <button className='basicButton'>
        {children}
      </button>
  );
}

export default BasicButton;
