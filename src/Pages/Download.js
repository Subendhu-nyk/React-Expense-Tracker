import React, { useContext, useState } from 'react'
import './Download.css'
import { Container, Row,Col } from 'react-bootstrap'
import ExpenseContext from '../Store/ExpenseContext';

const Download = () => {

  const [downloadUrl, setDownloadUrl] = useState('');
  const expenseCtx=useContext(ExpenseContext)

  console.log(expenseCtx.items)

  const generateDownloadUrl = () => {
      // Converts the JSON object to a string
      const jsonString = JSON.stringify(expenseCtx.items);

      //Now Create a Blob from the JSON string, if type of the file is mentioned in download attribute then no need to write here
      const blob = new Blob([jsonString], { type: 'application/json' });

      //Now Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
  };


  return (
    <Container>
        <Row>
            <Col lg={9}><div id="wrap">
    <a href={downloadUrl}  download="expenseActions.json" onClick={generateDownloadUrl} className="btn-slide2">
    <span className="circle2"><i class="fa fa-download"></i></span>
    <span className="title2">Download</span>
    <span className="title-hover2">Click here</span>
    </a>
    </div></Col>
        </Row>
    </Container>
    
  )
}

export default Download