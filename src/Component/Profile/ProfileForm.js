import React, { useContext, useEffect, useState } from 'react';
import ExpenseContext from '../../Store/ExpenseContext';
import { Button, Col, Container, Row } from 'reactstrap';


const ProfileForm = () => {
  
  const authCtx = useContext(ExpenseContext); 
  const [name,setName]=useState('')
  const [photo,setPhoto]=useState('')
  const [fetchEmail,setFetchEmail]=useState('')

   const token=localStorage.getItem('ExpenseToken')

  const fetchData = () => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0', {
      method: 'POST',
      headers: {        
        'Content-Type': 'application/json',      
      },
      body: JSON.stringify({
        idToken: token
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("get request",data.users[0].email); 
      setFetchEmail(data.users[0].email || '')
      setName(data.users[0].displayName || ''); 
    setPhoto(data.users[0].photoUrl || ''); 

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []); 
  

  const calculateCompletionPercentage = () => {
    
    let completedFields = 0;
    const totalFields = 3; 

    // const nameInput = document.getElementById('name');
    // const photoInput = document.getElementById('photo');
    // const emailInput = document.getElementById('email')
   
    if (name.trim() !== '') completedFields++;
    if (photo.trim() !== '') completedFields++;
    if (fetchEmail.trim() !== '') completedFields++;

    return (completedFields / totalFields) * 100;
  };




  useEffect(() => {
    const percentage = calculateCompletionPercentage();
    authCtx.setCompletionPercentage(percentage);
  }, [name, photo, authCtx]);
 

  const profileFormhandler=(event)=>{
    event.preventDefault();
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0',{
      method:'POST',
      body:JSON.stringify({
        idToken: authCtx.token, 
        displayName: name,
        photoUrl: photo,       
        returnSecureToken: true,
      }),
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then((res)=>{
      if(res.ok){
        console.log("res",res)
        return res.json()
      }
      else{
        return res.json().then((data)=>{
          let errorMessage = "Authentication Failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage); 
        })
      }
    }).then(data=>{
      console.log("data",data,"data.token",data.idToken)
    })
    .catch((err)=>{
      alert(err.message)
    })    
  }

  const nameChangeHandler=(event)=>{
    const name=event.target.value
    setName(name)
  }

  const photoChangeHandler=(event)=>{
    const photo=event.target.value    
    setPhoto(photo)
  }


  return (
    <Container>
      <Row>
        <Col lg='4'></Col>
        <Col lg='8' className='border-bottom border-secondary py-5'>
          <Row className='my-4'>
            <Col lg='6' className='text-start'>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
      Contact Details
           </h1>
            </Col>
            <Col lg='6' className='text-end mt-2'>
              <Button color="warning">Cancel</Button>
            </Col>
          </Row> 
          <form onSubmit={profileFormhandler}> 
          <Row className='my-4' >
            <Col lg='6'>
            <label htmlFor="name" className='pe-3'>Your Name :</label>
            <input type="text" id="name" value={name} onChange={nameChangeHandler}/>
            </Col>
            <Col lg='6'>
            <label htmlFor="photo" className='pe-3'>Profile Photo URL :</label>
            <input
              type="text"
              id="photo" 
              value={photo} 
              onChange={photoChangeHandler}        
            />
            </Col>
          </Row> 
          <Row>
            <Col lg='6'>
            <label htmlFor="email" className='pe-3'>Your Email :</label>
            <input type="email" id="email" value={fetchEmail} disabled/>
            </Col>
          
          </Row> 
          <Row className='mt-5'>
          <Col lg='12'>
          <Button
          type="submit" 
          color='success'          
        >               
          Update
        </Button> 
          </Col>  
          </Row>       
    </form> 
    </Col>
  </Row>
  </Container>

  )
}

export default ProfileForm