import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../../Context/AuthContext';
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  //? States
  const [errorAlert, setErrorAlert] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loader, setLoader] = useState(false)
  //? Refs
  const emailRef = useRef()
  const PasswordRef = useRef()
  //? Context
  const { login } = useAuth()
  //? Navigation
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoader(true)
    try {
      setProgress(40)
      await login(emailRef.current.value, PasswordRef.current.value)
      setProgress(100)
      setProgress(false)
      navigate('/')
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
          {errorAlert ? <Alert variant='danger'>Can't Login</Alert> : null}
          <h2>Login</h2>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={PasswordRef} required/>
          </Form.Group>
          <button type="submit" className='btn btn-success' disabled={loader}>Login</button>
          <Link to='/signup' className='text-decoration-none' style={{marginLeft:'5px'}}>Create an account</Link>
        </Form>
      </div>
    </div>
  </>
  );
}

export default Login;