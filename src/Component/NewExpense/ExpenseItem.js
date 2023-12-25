import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { Col, Row } from 'reactstrap'

const ExpenseItem = (props) => {
 
  return (
    <Row className='text-white my-3 fs-5 '>
    <Col lg='3'>{props.title}</Col>
    <Col lg='3'>{props.amount}</Col>
    <Col lg='3'>{props.category}</Col>
    <Col lg='3'className='ps-5'><Button variant='warning' onClick={() => props.onRemove(props.id)} >Delete</Button></Col>
    </Row>
  )
}

export default ExpenseItem