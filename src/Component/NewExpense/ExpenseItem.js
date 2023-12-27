import React, { Fragment, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Col, Row } from 'reactstrap'
import ExpenseContext from '../../Store/ExpenseContext'

const ExpenseItem = (props) => {
 const expenseCtx=useContext(ExpenseContext)

  return (
    <Row className='text-white my-3 fs-5 '>
    <Col lg='2'>{props.title}</Col>
    <Col lg='2'>{props.amount}</Col>
    <Col lg='2'>{props.category}</Col>
    <Col lg='3'className='ps-5'><Button variant='light' onClick={() => props.onEdit(props.id)} >Edit</Button></Col>
    <Col lg='3'className='ps-5'><Button variant='danger' onClick={() => props.onRemove(props.id)} >Delete</Button></Col>

    </Row>
  )
}

export default ExpenseItem