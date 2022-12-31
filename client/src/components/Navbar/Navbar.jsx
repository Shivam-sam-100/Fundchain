import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Navbar.css"
import useEth from '../../contexts/EthContext/useEth';
import { Link } from 'react-router-dom';

const Navbar = ({path}) => {
  // eslint-disable-next-line
  const [address,setAddress] = useState();
  const {state} = useEth();
  useEffect(() => {
    let curraddress = "none";
    if(state.accounts) curraddress =  state.accounts[0];
    setAddress(curraddress);
    // console.log(state.accounts);
  }, [state.accounts])
  
  return (
      <nav className="navbar">
          <img src={path} alt="eth-raiser" className="logo" />
          <ul className='navList'>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/mycharities">My Charities</Link>
              </li>
              <li>
                  <Link to="/createfund">Create Charity</Link>
              </li>
          </ul>
      </nav>
  );
}

export default Navbar