import React from 'react'
import Default from '../../components/Default/Default'
import AllLeaguesComponent from '../../components/LeaguesData/AllLeaguesComponent'
import { Col, Row } from 'react-bootstrap'
import CouponDetails from '../../components/MyCoupon/CouponDetails'

const AllLeagues = () => {
    return (
        <Default>
            <Row>
                <Col md={8}>
                    <AllLeaguesComponent />
                </Col>
                <Col md={4}>
                    <div className="p-3">
                        <CouponDetails />
                    </div>
                </Col>
            </Row>
        </Default >
    )
}

export default AllLeagues