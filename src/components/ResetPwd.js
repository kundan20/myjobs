import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card, Form, Alert  } from 'react-bootstrap'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import { CircularProgress } from '@material-ui/core'
import { CommonService } from '../shared/CommonService'
import { useHistory } from "react-router";
const cs = new CommonService();

const ResetPwd = (props) => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isErrorOccured, setIsErrorOccured ] = useState(false)
    const [ isResetSuccess, setIsResetSuccess ] = useState(false)
    const [ isPwdMismatch, setIsPwdMismatch ] = useState(false)
    const [ isEmailVerified, setIsEmailVerified ] = useState(props.isEmailVerified)

    const { updatedToken } = props
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
        const { password, confirmPassword } = formData
        const errorsObj = {}        
        if ( !password || password === '' ) errorsObj.password = 'Password ' + constants.CANT_BLANK
        if ( !confirmPassword || confirmPassword === '' ) errorsObj.confirmPassword = 'Confirm New Password ' + constants.CANT_BLANK
        return errorsObj
    }

    const loginHandler = () => {
        props.authToggleHandler('login');
    }

    const dismissHandler = () => {
        setIsErrorOccured(false)
        // setIsResetSuccess(false) 
        setIsPwdMismatch(false) 
    }

    const dismissEmailHandler = () => {
        setIsEmailVerified(false) 
    }

    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setIsPwdMismatch(false)
        const errorsObj = errorFormsHandler()
        formData.token = updatedToken

        if(formData.password !== formData.confirmPassword) {
            setIsPwdMismatch(true)
        }
        console.log('formData ', formData)
 
        if(Object.keys(errorsObj).length > 0) {
         setErrorsData(errorsObj)
         setIsLoading(false)
        } else {
             cs.changePwd(formData).then((res) => {
                 console.log(res)
                 if(res !== undefined && res.success) {      
                    console.log('changePwd success res', res)       
                    setIsResetSuccess(true)
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
         <Row >
                <Col>
                    <Alert show={isEmailVerified} variant={`success`} onClose={dismissEmailHandler} dismissible>
                    {isEmailVerified ? constants.EMAIL_VERIFIED : constants.EMAIL_NOT_FOUND}
                </Alert>

                </Col>
            </Row>
          <Row >
                <Col>
                    <Alert show={isErrorOccured || isResetSuccess || isPwdMismatch } variant={`${isResetSuccess ? 'success' : 'danger'}`} onClose={dismissHandler} dismissible>
                        {isPwdMismatch ? constants.PWD_MISMATCH : (isResetSuccess ? constants.PWD_RESET_SUCCESS :  constants.FAILED_MSG )}
                    </Alert>

                </Col>
            </Row>
            <Row >
                <Col md={12}>
                    <h4>{constants.RST_PWD}</h4>
                </Col>
                <Col>
                    <div className = "fgt-pwd-desc">{constants.RST_PWD_DESC}</div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form onSubmit = {formHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password </Form.Label>
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

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm new password</Form.Label>
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
                        <div className = "text-center mt-4">
                            <Button className = "common-btn " type="submit">
                                { isLoading && <CircularProgress size={20} className = "clr-wht cp" /> }
                                { !isLoading && 'Reset' }                                
                            </Button>
                        </div>
                        {isResetSuccess &&
                            <div className = "text-center mt-4">
                                <div className="new-job">You can now <span onClick = {loginHandler}>Login</span></div>
                            </div>
                        }
                       
                    </Form>

                </Col>
            </Row>
        </>
    )
}
export default ResetPwd
