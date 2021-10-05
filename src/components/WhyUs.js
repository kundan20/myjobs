import React from 'react'
import { Col, Row } from 'react-bootstrap'
import * as constants from '../shared/Constants'

const WhyUs = (props) => {
    const { infoData } = props;
    return (
        <>
            <Row>
                <Col>
                    <Row className="why-us-title mt-mbl-9rem">
                        <Col>
                            <h4>{constants.WHY_US}</h4>
                        </Col>
                    </Row>
                    <Row className="why-us-tile mt-0rem">
                        {infoData !== undefined && infoData.map((item, ind) => {
                            return (
                                <Col md={4} key={ind} className = "mt-1rem">
                                    <div className="info-tile">
                                        <Row>
                                            <Col md={7}>
                                                <h4>{item.title}</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <div className = "mt-4">{item.desc}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            )
                        })}
                        
                    </Row>
                </Col>
            </Row>
                        
        </>
    )
}

export default WhyUs
