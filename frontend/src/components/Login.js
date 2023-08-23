import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({ head,setIsLoggedIn,setUsername,setAdminLogin }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    function login() {
        axios.post('/login', {
            username: loginUsername,
            password: loginPassword
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                setIsLoggedIn(true);
                navigate('/')
                setUsername(loginUsername)

            } else {
                alert("Invalid credentials")
                setLoginPassword('');
                setLoginUsername('')
            }
        })
    }

    function adminLogin() {
        if (loginUsername === "admin" && loginPassword === "clothing@12") {
            setAdminLogin(true);
        } else {
            alert("invalid credentials")
        }
    }

    return (
        <MDBContainer fluid>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'>

                    <h2 className="fw-bold mb-5">{ head}</h2>


                    <MDBInput wrapperClass='mb-4'  style={{marginLeft: 'auto', marginRight: 'auto',maxWidth: '300px'}} label='Username' id='form1' type='text' onChange={(e)=>{setLoginUsername(e.target.value)}} />
                    <MDBInput wrapperClass='mb-4'  style={{marginLeft: 'auto', marginRight: 'auto',maxWidth: '300px'}} label='Password' id='form1' type='password' onChange={(e)=>{setLoginPassword(e.target.value)}} />


                    <MDBBtn className='mb-4' size='md' onClick={()=>{ head === 'Admin Login' ? adminLogin() : login()}} >Login</MDBBtn>

                    

                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default LoginPage;