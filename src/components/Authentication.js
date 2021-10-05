import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card  } from 'react-bootstrap'
import LayoutNavbar from '../shared/LayoutNavbar'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import { useHistory } from "react-router";
import Modal from 'react-awesome-modal'
import Login from './Login'
import Signup from './Signup'
import ForgetPwd from './ForgetPwd'

const Authentication = () => {
    const [ isLogin, setIsLogin ] = useState(true)
    const [ isSignup, setSignup ] = useState(false)
    const [ isFgtPwd, setFgtPwd ] = useState(false)
    const history = useHistory();

    const authToggleHandler = (authComp) => {
        console.log('authComp--', authComp)
        if(authComp === 'login') {
            setIsLogin(true)
            setSignup(false)
            setFgtPwd(false)
        } else if(authComp === 'signup') {
            setIsLogin(false)
            setSignup(true)
            setFgtPwd(false)
        } else {
            setIsLogin(false)
            setSignup(false)
            setFgtPwd(true)
        }
    }

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        let userData = JSON.parse(localStorage.getItem('userData'))
        console.log('token Auth --', token)
        if(token && userData ) {
            history.push({
                pathname: '/jobs'
              })
        } else {
          history.push({
            pathname: '/login'
          })
        }   
    }, [])

    return (
        <>
            <section className="home-banner">
                <Container className="py-3">
                    <Row>
                        <Col>
                            <LayoutNavbar />
                        </Col>
                    </Row>                
                </Container>
            </section>
            <section className="login-content bottom-content">
                <Container className="py-3">
                    <Row>
                        <Col md={{offset:4, span:4}}>
                            <div className="login">
                                <div className="auth-modal">
                                    {isLogin && <Login authToggleHandler = {authToggleHandler} /> }
                                    {isSignup && <Signup authToggleHandler = {authToggleHandler} /> }
                                    {isFgtPwd && <ForgetPwd authToggleHandler = {authToggleHandler} /> }
                                </div>


                            </div>
                        </Col>
                    </Row>                
                </Container>
            </section>
        
        </>
    )
}

export default Authentication
