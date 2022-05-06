import React, {useState} from 'react';
// import { AppContext } from "../AppProvider";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from 'mdbreact';
// import SectionContainer from '../components/sectionContainer';
// import { ReactComponent as Logo1 } from '../assets/incedo13.svg';
// import { ReactComponent as Logo1 } from '../assets/atom.svg';
import { ReactComponent as Logoincedo1 } from '../assets/incedoDSP1.svg';


const LoginModal = (props)=>{
  

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modal1, setModal1] =  useState(true)
    const [user, setUser] = useState(null);

    const toggle1=()=>{
        setModal1(prevSetModal1=>!prevSetModal1)
      }

    const handleSubmit = (e, setLoggedIn) => {
        e.preventDefault();
        
        const userData = {
          username,
          password
        };
        if(username != "" && password !== ""){
        setUser(userData);
        setUsername("");
        setPassword("");
        toggle1();
        setLoggedIn();
        }
      };

     
return (
    <MDBContainer>
        <MDBModal isOpen={modal1}>
            <MDBModalHeader
              className='text-center text-white'
              titleClass='w-100 font-weight-bold'
              style={{backgroundColor:"black"}}
            > 
            {/* <Logoincedo1 style={{ height: '4rem', width: '4rem', float:"left" }} /> */}
               <h4 style={{fontSize:"1rem", color:"white"}}> Data Science Playground</h4>
              {/* <Logo style={{ height: '1.6rem', width: '4rem', float:"right", paddingTop:"1rem" }} /> */}
            </MDBModalHeader>
            <MDBModalBody className='text-center' >
          
              <form className='mx-3 grey-text' >
                <MDBInput
                  label='Username'
                  name='username'
                  // icon='user'
                  type='text'
                  validate
                  error='wrong'
                  success='right'
                  autoComplete='off'
                  value={username}
                  onChange={e=>setUsername(e.target.value)}
                />
                <MDBInput
                  label='Password'
                  name='password'
                  // icon='lock'
                  type='password'
                  value={password}
                  autocomplete='off'
                  validate
                  onChange={e=>setPassword(e.target.value)}
                />
              </form>
              <MDBBtn onClick={e=>handleSubmit(e, props.setLoggedIn)}  color="primary">Login</MDBBtn>
            </MDBModalBody>
            {/* <MDBModalFooter className='justify-content-center' style={{backgroundColor:"black"}}>
            
            </MDBModalFooter> */}
          </MDBModal>
    </MDBContainer>) 
       }

export default LoginModal