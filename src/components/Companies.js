import React from 'react'
import { Col, Row } from 'react-bootstrap'
import * as constants from '../shared/Constants'

const Companies = (props) => {
    const { imageData } = props;
    console.log(imageData)
    return (
        <>
            <Row>
                <Col className="py-4rem">
                    <Row className="why-us-title">
                        <Col>
                            <h4>{constants.TRUST_US}</h4>
                        </Col>
                    </Row>
                    <Row className="why-us-tile mt-0rem">
                        {imageData !== undefined && imageData.map((item, ind) => {
                            return (
                                <>
                                    <Col key={ind} md = {3} className = {`mt-1rem d-none d-sm-block ${ind > 3 ? 'py-5' : ''}`}>
                                        <img src = {item.path} alt = {`logo_${ind+1}`} />
                                    </Col>

                                    <Col key={ind} className = "mt-1rem d-block d-sm-none">
                                    <img src = {item.path} alt = {`logo_${ind+1}`} />
                                    </Col>
                                </>
                            )
                        })}
                        
                    </Row>
                </Col>
            </Row>
                        
        </>
    )
}

export default Companies
