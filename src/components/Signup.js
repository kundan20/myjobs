import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card, Form, Alert  } from 'react-bootstrap'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import { CircularProgress } from '@material-ui/core'
import { CommonService } from '../shared/CommonService'
import { useHistory } from "react-router";
const cs = new CommonService();

const Signup = (props) => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isErrorOccured, setIsErrorOccured ] = useState(false)
    const [ userRole, setUserRole ] = useState([])
    const [ currentRoleInd, setCurrentRoleInd ] = useState()
    const [ isPwdMismatch, setIsPwdMismatch ] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setUserRole(master.userRole)
    }, [])

    const setValue = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        if(!!errorsData[e.target.name]) {
            setErrorsData({
                ...errorsData,
                [e.target.name] : null
            })
        }
    }

    const errorFormsHandler = () => {
        const { email, password, name, confirmPassword, skills } = formData
        const errorsObj = {}    
        if ( !name || name === '' ) errorsObj.name =  'Name ' + constants.CANT_BLANK
        if ( !password || password === '' ) errorsObj.password = 'Password ' + constants.CANT_BLANK
        if ( !confirmPassword || confirmPassword === '' ) errorsObj.confirmPassword = 'Confirm Password ' + constants.CANT_BLANK
        if ( !skills || skills === '' ) errorsObj.skills = 'Skills ' + constants.CANT_BLANK
        if ( !email || email === '' ) errorsObj.email = 'Email ' + constants.CANT_BLANK
        return errorsObj
    }
    
    const loginHandler = () => {
        props.authToggleHandler('login');
    }

    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setIsPwdMismatch(false)
        const errorsObj = errorFormsHandler()
        formData.userRole = currentRoleInd
        if(formData.password !== formData.confirmPassword) {
            setIsPwdMismatch(true)
        }
        console.log('formData ', formData)
 
        if(Object.keys(errorsObj).length > 0) {
         setErrorsData(errorsObj)
         setIsLoading(false)
        } else {
             cs.registerUser(formData).then((res) => {
                 console.log(res)
                 if(res !== undefined && res.success) {      
                    console.log('success res', res)       
                     localStorage.setItem('token', JSON.stringify(res.data.token))
                     localStorage.setItem('userData', JSON.stringify(res.data))
                     history.push({
                         pathname: '/jobs'
                     })
                 } else {
                     setIsErrorOccured(true)
                 }
                 setIsLoading(false)
 
             }, (err) =>{
                 console.log('Failed..', err)
                 setIsLoading(false)
                 setIsErrorOccured(true)
             })
             .catch((res) => {
                 console.log('There is an error ', res)
                 setIsLoading(false)
                 setIsErrorOccured(true)
             }) 
        }
    }

    const roleHandler = (ind, role) => {
        console.log(role)
        setCurrentRoleInd(ind)
    }

    const dismissHandler = () => {
        setIsErrorOccured(false)
        setIsPwdMismatch(false) 
    }
    return (
        <>
            <Row >
                <Col>
                    <Alert show={isErrorOccured || isPwdMismatch} variant="danger" onClose={dismissHandler} dismissible>
                        {isPwdMismatch ? constants.PWD_MISMATCH :  constants.FAILED_MSG}
                    </Alert>

                </Col>
            </Row>
            <Row >
                <Col>
                    <h4>{constants.SIGNUP}</h4>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form onSubmit = {formHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>I’m a*</Form.Label>
                            <Row>
                                {userRole !== undefined && userRole.map((item, ind) => {
                                    return (
                                        <Col md={5} key={ind}>
                                            <div className = {`role-btn ${currentRoleInd === ind ? 'role-btn-selected' : ''}`} onClick = {() => roleHandler(ind, item.role)}>
                                                <i className = {`${item.icon} role-icon-clr`}></i>&nbsp;<span>{item.role}</span>
                                            </div>
                                        </Col>
                                    )
                                })}
                               
                            </Row>                                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your full name" 
                                name = "name" 
                                pattern = ".*[A-Za-z]"
                                title = "Name should be only alphabet letters"
                                value = {formData.name} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.name }
                            </Form.Control.Feedback>                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                name = "email" 
                                value = {formData.email} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.email }
                            </Form.Control.Feedback>                            
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Create Password </Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        name = "password" 
                                        value = {formData.password} 
                                        onChange = {setValue} 
                                        isInvalid = {!!errorsData.password}
                                        minLength="6"
                                        title="Minimum six characters"
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { errorsData.password }
                                    </Form.Control.Feedback>   
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password </Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        name = "confirmPassword" 
                                        value = {formData.confirmPassword} 
                                        onChange = {setValue} 
                                        isInvalid = {!!errorsData.confirmPassword}
                                        minLength="6"
                                        title="Minimum six characters"
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { errorsData.confirmPassword }
                                    </Form.Control.Feedback>   
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label> Skills </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter comma separated skills" 
                                name = "skills" 
                                value = {formData.skills} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.skills}
                                multiple
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.skills }
                            </Form.Control.Feedback>   
                        </Form.Group>

                        <div className = "text-center mt-4">
                            <Button className = "common-btn " type="submit">
                                { isLoading && <CircularProgress size={20} className = "clr-wht cp" /> }
                                { !isLoading && 'Signup' }                                
                            </Button>
                        </div>
                        
                        <div className = "text-center mt-4">
                            <div className="new-job">Have an account? <span onClick = {loginHandler}>Login</span></div>
                        </div>
                    </Form>

                </Col>
            </Row>
        </>
    )
}

export default Signup
