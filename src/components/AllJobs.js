import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card  } from 'react-bootstrap'
import LayoutNavbar from '../shared/LayoutNavbar'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import Modal from 'react-awesome-modal'
import Login from './Login'
import PostJob from './PostJob'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { CommonService } from '../shared/CommonService'
const cs = new CommonService();

const AllJobs = () => {
    const [isApplicantViewed, setIsApplicantViewed ] = useState(false)
    const [jobs, setJobs ] = useState([])
    const [currentJob, setCurrentJob ] = useState([])

    const [ isLoading, setIsLoading ] = useState(true)
    const [ isJobLoading, setIsJobLoading ] = useState(false)
    const [ currentPage, setcurrentPage ] = useState(1)
    const [ itemPerPage, setItemPerPage ] = useState(6)

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        let userData = JSON.parse(localStorage.getItem('userData'))
        console.log('token Auth --', token)
        if(token && userData ) {
            cs.getAllJobs(token).then((res) => {
                console.log('getAllJobs ', res)
                if(res !== undefined && res.success) {      
                   console.log('success res', res)     
                   setJobs(res.data)
                } 
               setIsLoading(false)

            }, (err) =>{
                console.log('Failed..', err)
                setIsLoading(false)
            })
            .catch((res) => {
                console.log('There is an error ', res)
                setIsLoading(false)
            }) 
        }
    }, [])

    const modalHandler = (id) => {
        setIsApplicantViewed(true)
        setIsJobLoading(true)
        let token = JSON.parse(localStorage.getItem('token'))
        cs.getJobById(id, token).then((res) => {
            console.log('getJobById ', res)
            if(res !== undefined && res.success) {      
               console.log('getJobById success res', res)     
               setCurrentJob(res.data)
            } 
            setIsJobLoading(false)
        }, (err) =>{
            console.log('Failed..', err)
            setIsJobLoading(false)
        })
        .catch((res) => {
            console.log('There is an error ', res)
            setIsJobLoading(false)
        }) 
    }

    const closeModal = () => {
        setIsApplicantViewed(false)
    }
    const nextHandler = () => {
        setcurrentPage(currentPage + 1)
    }
    const prevHandler = () => {
        setcurrentPage(currentPage - 1)
    }
    const lastIndex = currentPage * itemPerPage;
    const startIndex = lastIndex - itemPerPage;
    const updatedJobs = jobs.slice(startIndex, lastIndex)
    console.log(updatedJobs)
    console.log('itemPerPage ', itemPerPage)

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
                            <div className="breadcrumb"><i className="fas fa-home"></i>&nbsp;Home </div>
                            <div className="job-post-desc">{constants.JOB_POST_DESC}</div>
                            
                        </Col>
                    </Row>             
                </Container>
            </section>
            <section className="bottom-content job-content">
                <Container className="py-3">
                    <Row>
                        {updatedJobs.length !== 0 && updatedJobs.map((item, ind) => {
                            return (
                                <Col className="mt-4" md={{ span:3}}>
                                    <div className="job">
                                        <div className="job-modal">
                                            <div className="job-title">{item.title}</div>
                                            <p className="job-desc mt-2">{item.description}</p>
                                            <Row className="mt-2">
                                                <Col md={6}>                                       
                                                    <i className="fas fa-map-marker-alt loc-icon"></i> <span className="loc ml-1">{item.location}</span>
        
                                                </Col>
                                                <Col>
                                                    <Button className="applicant-btn" onClick={() => modalHandler(item.id)}>View Applications</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}

                        {jobs.length === 0 && 
                            <Col>
                                <div className="v-center-icon">
                                    <div><i className="fas fa-file-alt file-icon"></i></div>
                                    <div className = "applicants-title">{constants.APPLICANTS_DESC}</div>
                                    <Link to="/post-job">
                                        <Button className="post-btn" >{constants.POST_JOB}</Button>
                                    </Link>
                                </div>
                            </Col>
                        }

                        {
                            jobs.length !== 0 && 
                            <>
                                <Row>
                                    <Col  className = "d-flex justify-content-center ">
                                        <div className = "mt-4">
                                            {currentPage > 1 && <span onClick={prevHandler} className = "prev-page"><i className="fas fa-caret-left"></i></span> }
                                            <span className = "current-page">{currentPage}</span>
                                            {itemPerPage <= updatedJobs.length && <span onClick={nextHandler} className = "next-page"><i className="fas fa-caret-right"></i></span>  }
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        }

                    </Row>                
                </Container>
                <Modal visible={isLoading || isJobLoading } width="0" height="0" effect="fadeInUp">
                    <Row>
                        <Col className = "d-flex justify-content-start" md = {6}>
                            <Loader type = "ThreeDots" color = "#395FD3" height = {80} width = {80} />
                        </Col>
                    </Row>
                </Modal>
                <Modal visible={isApplicantViewed} width="600" height="500" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <div className = "p-4">
                        <Row>
                            <Col>
                                <div className = "applicants-job">{constants.APPLICANTS_JOB}</div>
                            </Col>
                            <Col >
                                <div className ="close-icon" onClick = {() => closeModal()}><i className="fas fa-times "></i></div>
                            </Col>
                        </Row>                          
                        <div className = "applicant-btm-brdr mt-2"></div>
                        <div className = "applicant-num mt-1">Total {currentJob.length !== 0 ? currentJob.length : '0'} applicants</div>
                        {currentJob.length !== 0 && 
                            <Row className = "applicants-content mt-2">
                                <Col md={6} className="mt-4">
                                    <div className = "applicants-profile">
                                        <Row>
                                            <Col md={3} xs={3}>
                                                <div className="applicant-first-letter">K</div>
                                            </Col>
                                            <Col md={9} xs={9}>
                                                <div className="applicant-name">Kundan Nigam</div>
                                                <div className="applicant-email">kundan.nigam@gmail.com</div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2" >
                                            <Col>
                                                <div className="applicant-skills">Skills</div>
                                                <div className="applicant-skills-desc">Coding, designing, graphics, website, app ui</div>
                                            </Col>
                                        
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        }
                        
                        {currentJob.length === 0 &&                         
                            <Row className = "applicants-content ">
                                <Col  className="">
                                    <div className="v-center-icon">
                                        <div><i className="fas fa-file-alt file-icon"></i></div>
                                        <div className = "applicants-title">{constants.APPLICANTS_POST_DESC}</div>                                    
                                    </div>
                                </Col>
                            </Row>
                        }
                    </div>
                </Modal>

            </section>
        
        </>   
       
    )
}

export default AllJobs

