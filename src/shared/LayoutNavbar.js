import React, { useState, useEffect } from 'react'
import { Navbar, NavDropdown, Nav, Container  } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CommonService } from '../shared/CommonService'
import * as constants from '../shared/Constants'
import { useHistory } from "react-router";
const cs = new CommonService();

const LayoutNavbar = (props) => {
  const [ isDrpDwnClicked, setIsDrpDwnClicked ] = useState(false);
  const [ isvalidToken, setIsValidToken ] = useState(false)
  const [ userData, setUserData ] = useState({})

  const history = useHistory();
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'))
    let userData = JSON.parse(localStorage.getItem('userData'))
    setIsValidToken(false)

    console.log('token userData--', token, userData)
    if(token && userData ) {
      console.log('valid token')
      setUserData(userData)
      setIsValidToken(true)
    } else {
      setIsValidToken(false)
      history.push({
        pathname: '/login'
      })
    }   
  }, [])

  const dropDownHandler = () => {
    setIsDrpDwnClicked(!isDrpDwnClicked)
  }

  const logOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsValidToken(false)
    history.push({
      pathname:  "/",
      state: {
        isLogoutSuccess: true
      }       
    });
  }
  console.log('isvalidToken', isvalidToken)
  return (
    <Navbar expand="lg" className="layout-navbar">
      <Navbar.Brand as={NavLink} to={isvalidToken ? '/jobs' : '/login'} className="app-brand"><span className="my-title">{constants.LOGO_TITLE_1}</span><span className="jobs-title">{constants.LOGO_TITLE_2}</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav>
            {!isvalidToken && <Nav.Item as={NavLink} to= '/login' className="auth-btn">{constants.AUTH_TITLE}</Nav.Item> }
            {isvalidToken  && userData  && 
            <>
              {userData.userRole !== undefined && userData.userRole === 0 &&  <Nav.Item as={NavLink} to="/post-job" className="navbar-post-job mr-2">{constants.POST_JOB}</Nav.Item>}
              <span className="layout-first-letter"><span className = "circle-icon">{userData ? userData.name[0].toUpperCase() : ''}</span></span> 
              <span className = "layout-dropdown" onClick = {dropDownHandler}><i className="fas fa-caret-down d-sm-block d-none mt-2"></i><i className="fas fa-caret-right d-sm-none d-block"></i></span>
              {isDrpDwnClicked && 
                <div className = "layout-dropdown-logout" onClick = {logOutHandler}>{constants.LOGOUT}</div>
              }    
            </>        
          }
        </Nav>  
      </Navbar.Collapse>
    </Navbar>
  )
}

export default LayoutNavbar
