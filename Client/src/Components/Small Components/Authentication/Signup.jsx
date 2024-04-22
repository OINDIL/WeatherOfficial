import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../../Context/AuthContext';
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
  //? States
  const [errorAlert, setErrorAlert] = useState(false)
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loader, setLoader] = useState(false)
  //? Refs
  const emailRef = useRef()
  const nameRef = useRef()
  const PasswordRef = useRef()
  const confirmPasswordRef = useRef()
  //? Context
  const { signUp,updateDisplayName } = useAuth()
  //? Navigation
  const navigate = useNavigate()
  
  async function handleSubmit(event) {
    event.preventDefault()
    setLoader(true)
    if(PasswordRef.current.value !== confirmPasswordRef.current.value){
        setConfirmPasswordAlert(true)
        return
    }
    try {
      setProgress(40)
      await signUp(emailRef.current.value, PasswordRef.current.value)
      await updateDisplayName(nameRef.current.value)
      setProgress(100)
      setProgress(false)
      setLoader(false)
      navigate('/notes')

    } catch (err) {
      setErrorAlert(true)
      setProgress(100)
      setLoader(false)
    }

  }
  return (
    <>
    {loader ? <LoadingBar color='#519872' progress={progress} onLoaderFinished={() => setProgress(0)}/> : null}
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100svh' }}>
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <Form className='border rounded p-3 shadow' onSubmit={handleSubmit}>
          {errorAlert ? <Alert variant='danger'>Can't Create an account <span className='fw-bold' onClick={()=>setErrorAlert(false)} style={{cursor:'pointer'}}>Try Again</span></Alert> : null}
          {confirmPasswordAlert ? <Alert variant='danger'>Passwords Don't Match  <span className='fw-bold' onClick={()=>setErrorAlert(false)} style={{cursor:'pointer'}}>Try Again</span></Alert> : null}
          <h2>Signup</h2>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" ref={nameRef} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={PasswordRef} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={confirmPasswordRef} required/>
          </Form.Group>
          <button type="submit" className='btn btn-success' disabled={loader || errorAlert}>Signup</button>
          <Link to='/login' className='text-decoration-none' style={{marginLeft:'5px'}}>Login</Link>
        </Form>
      </div>
    </div>
  </>
  );
}

export default Signup;