import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card, Form, Alert  } from 'react-bootstrap'
import * as constants from '../shared/Constants'
import { CircularProgress } from '@material-ui/core'
import { CommonService } from '../shared/CommonService'
import { useHistory } from "react-router";
const cs = new CommonService();

const Login = (props) => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    // const [ userData, setUserData ] = useState({})
    const [ isErrorOccured, setIsErrorOccured ] = useState(false)
    const history = useHistory()
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
        const { email, password } = formData
        const errorsObj = {}        
        if ( !email || email === '' ) errorsObj.email = 'Email ' + constants.CANT_BLANK
        if ( !password || password === '' ) errorsObj.password = 'Password ' + constants.CANT_BLANK
        return errorsObj
    }

    const signupHandler = () => {
        props.authToggleHandler('signup');
    }

    const fgtPwdHandler = () => {
        props.authToggleHandler('fgtPwd');
    }
    
    const formHandler = (e) => {
       e.preventDefault()
       setIsLoading(true)
       const errorsObj = errorFormsHandler()
    //    console.log('errorsObj ', errorsObj)
    //    console.log('formData ', formData)

       if(Object.keys(errorsObj).length > 0) {
        setErrorsData(errorsObj)
        setIsLoading(false)
       } else {
            cs.loginUser(formData).then((res) => {
                console.log(res)
                if(res !== undefined && res.success) {                    
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
           
            console.log('formData else', formData)

       }
    }
    return (
        <>
            <Row >
                <Col>
                    <Alert show={isErrorOccured} variant="danger" onClose={() => setIsErrorOccured(false)} dismissible>
                        {constants.FAILED_MSG}
                    </Alert>

                </Col>
            </Row>
            <Row >
                <Col>
                    <h4>{constants.LOGIN}</h4>
                </Col>
            </Row>
            <Row className="mt-2">
                
                <Col>
                    <Form onSubmit = {formHandler}>
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
                            <Form.Control.Feedback type='invalid' >
                                { errorsData.email }
                            </Form.Control.Feedback>                            
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Password </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                name = "password" 
                                value = {formData.password} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.password}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.password }
                            </Form.Control.Feedback>   
                        </Form.Group>
                        <div className = "text-center mt-4">
                            <Button className = "common-btn " type="submit">
                                { isLoading && <CircularProgress size={20} className = "clr-wht cp" /> }
                                { !isLoading && 'Login' }
                            </Button>
                        </div>
                        <div className = "text-center mt-4">
                            <div className="fgt-pwd" onClick = {fgtPwdHandler}>{constants.FGT_PWD}</div>
                        </div>
                        <div className = "text-center mt-2">
                            <div className="new-job">New to MyJobs? <span onClick = {signupHandler}>Create an account</span></div>
                        </div>
                    </Form>

                </Col>
            </Row>
        </>
    )
}

export default Login
