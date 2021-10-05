import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card, Form, Alert  } from 'react-bootstrap'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import { CircularProgress } from '@material-ui/core'
import { CommonService } from '../shared/CommonService'
import { useHistory } from "react-router";
import ResetPwd from './ResetPwd'

const cs = new CommonService();

const ForgetPwd = (props) => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isErrorOccured, setIsErrorOccured ] = useState(false)
    const [ isEmailVerified, setIsEmailVerified ] = useState(false)
    const [ isResetModal, setIsResetModal ] = useState(false)
    const [ updatedToken, setupdatedToken ] = useState()

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
        const { email } = formData
        const errorsObj = {}        
        if ( !email || email === '' ) errorsObj.email = 'Email ' + constants.CANT_BLANK
        return errorsObj
    }
    const signupHandler = () => {
        props.authToggleHandler('signup');
    }
    const dismissHandler = () => {
        setIsErrorOccured(false)
        setIsEmailVerified(false)
    }
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const errorsObj = errorFormsHandler()
     
        console.log('formData ', formData)
 
        if(Object.keys(errorsObj).length > 0) {
         setErrorsData(errorsObj)
         setIsLoading(false)
        } else {
             cs.getResetPwdToken(formData.email).then((res) => {
                 console.log(res)
                 if(res !== undefined && res.success) {      
                    console.log('success res', res) 
                    setIsEmailVerified(true)
                    cs.verifyPwdToken(res.data.token).then((verRes) => {
                        console.log('verifyPwdToken res', verRes)
                        if(verRes !== undefined && verRes.success) { 
                            setupdatedToken(res.data.token)
                            setIsResetModal(true)
                        } 
                    },(verErr) =>{
                        console.log('Failed..', verErr)                       
                    }).catch((verRes) => {
                        console.log('There is an error ', verRes)
                      
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

    return (
        <>
        {!isResetModal && <>
            <Row >
                <Col>
                    <Alert show={isErrorOccured || isEmailVerified } variant={`${isEmailVerified ? 'success' : 'danger'}`} onClose={dismissHandler} dismissible>
                        {isEmailVerified ? constants.EMAIL_VERIFIED : constants.EMAIL_NOT_FOUND}
                    </Alert>

                </Col>
            </Row>
            
            <Row >
                <Col md= {12}>
                    <h4>{constants.FGT_PWD}</h4>
                </Col>
                <Col>
                    <div className = "fgt-pwd-desc">{constants.FGT_PWD_DESC}</div>
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
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.email }
                            </Form.Control.Feedback>                            
                        </Form.Group>

                        <div className = "text-center mt-4">
                            <Button className = "common-btn " type="submit">
                                { isLoading && <CircularProgress size={20} className = "clr-wht cp" /> }
                                { !isLoading && 'Submit' }                                
                            </Button>
                        </div>
                        <div className = "text-center mt-2">
                            <div className="new-job">New to MyJobs? <span onClick = {signupHandler}>Create an account</span></div>
                        </div>                       
                    </Form>
                </Col>
            </Row>
            </>
            }
            {isResetModal &&
                <ResetPwd authToggleHandler = {props.authToggleHandler} updatedToken = {updatedToken} isEmailVerified = {isEmailVerified} />
            }
        </>
    )
}

export default ForgetPwd
