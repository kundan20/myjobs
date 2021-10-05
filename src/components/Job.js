import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card  } from 'react-bootstrap'
import LayoutNavbar from '../shared/LayoutNavbar'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import Modal from 'react-awesome-modal'
import Login from './Login'
import PostJob from './PostJob'
import { useHistory } from "react-router";

const Job = () => {
    const [ userData, setUserData ] = useState({})

    const history = useHistory()
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        let userData = JSON.parse(localStorage.getItem('userData'))
        console.log('token --', token)
        if(token && userData) {
            setUserData(userData)
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
                    <Row>
                        <Col md={{span: 4, offset: 1}} className="py-5 post-desc">
                            <div className="breadcrumb"><span className = "cur-ptr" onClick = {() => history.push('/jobs' )}><i className="fas fa-home"></i>&nbsp;Home</span>&nbsp;{`${userData !== undefined && userData.userRole === 0 ? '> Post a Job ' : ''} `} </div>                            
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
                                    <PostJob />
                                </div>


                            </div>
                        </Col>
                    </Row>                
                </Container>
            </section>
        
        </>   
       
    )
}

export default Job
