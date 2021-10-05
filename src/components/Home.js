import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card  } from 'react-bootstrap'
import LayoutNavbar from '../shared/LayoutNavbar'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import WhyUs from './WhyUs'
import Companies from './Companies'
import { Link } from 'react-router-dom'

const Home = (props) => {
    const [ infoData, setInfoData ] = useState([]);
    const [ imageData, setImageData ] = useState([]);
    console.log('Home Props--', props)
    useEffect(() => {
        setInfoData(master.why_us_info)  
        setImageData(master.logos)       
    }, []);

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
                        <Col md={{span: 4, offset: 1}} className="py-5 wlcm-title">
                            <div className="wlcm-title-1">{constants.WELCOME_TITLE_1}</div>
                            <div className="wlcm-title-2">{constants.LOGO_TITLE_1}<span>{constants.LOGO_TITLE_2}</span></div>
                            <Link to="/login">
                                <Button className="common-btn mt-4">{constants.BANNER_BTN}</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="home-content bottom-content">
                <Container className="py-3">
                    <Row>
                        <Col md={{ offset: 1}} className="py-4rem">
                            <Row>
                                <Col md={{offset:7, span:5}}>
                                    <div className="banner-img-card" >
                                        <img src = "/images/banner.jpg" alt = "banner" />
                                    </div>                                 
                                </Col>
                            </Row>
                            <WhyUs infoData = {infoData}/>         
                            <Companies imageData = {imageData} />                           
                        </Col>
                    </Row>
                </Container>                
            </section>
        </>
    )
}

export default Home
