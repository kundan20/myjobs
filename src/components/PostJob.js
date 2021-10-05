import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card, Form, Alert  } from 'react-bootstrap'
import * as constants from '../shared/Constants'
import * as master from '../shared/MasterData'
import { CircularProgress } from '@material-ui/core'
import { CommonService } from '../shared/CommonService'
import { useHistory } from "react-router";
const cs = new CommonService();

const PostJob = () => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
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
        const { title, description, location } = formData
        const errorsObj = {}    
        if ( !title || title === '' ) errorsObj.title =  'Title ' + constants.CANT_BLANK
        if ( !description || description === '' ) errorsObj.description = 'Description ' + constants.CANT_BLANK
        if ( !location || location === '' ) errorsObj.location = 'Location ' + constants.CANT_BLANK
        return errorsObj
    }

    
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const errorsObj = errorFormsHandler()
        let token = JSON.parse(localStorage.getItem('token'))

        console.log('formData, token ', formData, token)
 
        if(Object.keys(errorsObj).length > 0) {
         setErrorsData(errorsObj)
         setIsLoading(false)
        } else {
             cs.createJob(formData, token).then((res) => {
                 console.log(res)
                 if(res !== undefined && res.success) {      
                    console.log('success res', res)       
                //  history.push({
                //      pathname: '/jobs'
                //  })
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

    const dismissHandler = () => {
        setIsErrorOccured(false)
    }

    return (
        <>
            <Row >
                <Col>
                    <Alert show={isErrorOccured } variant="danger" onClose={dismissHandler} dismissible>
                        {constants.FAILED_MSG}
                    </Alert>

                </Col>
            </Row>
            <Row >
                <Col>
                    <h4>{constants.PST_JOB}</h4>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form onSubmit = {formHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>Job title*</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter job title*" 
                                name = "title" 
                                value = {formData.title} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.title}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.title }
                            </Form.Control.Feedback>                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description*</Form.Label>
                            <Form.Control 
                                as = "textarea" 
                                placeholder="Enter job description" 
                                name = "description" 
                                style={{ height: '100px' }}
                                value = {formData.description} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.description}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.description }
                            </Form.Control.Feedback>                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location*</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter location" 
                                name = "location" 
                                value = {formData.location} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.location}
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsData.location }
                            </Form.Control.Feedback>                            
                        </Form.Group>
                       
                        <div className = "text-center mt-4">
                            <Button className = "common-btn " type="submit">
                                { isLoading && <CircularProgress size={20} className = "clr-wht cp" /> }
                                { !isLoading && 'Post' }                                
                            </Button>
                        </div>
                       
                    </Form>

                </Col>
            </Row>
        </>
    )
}
export default PostJob
