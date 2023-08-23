import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';

function Home({ data,isLoggedIn }) {
    const el = useRef(null)

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['BOLD', "AESTHETIC"],
            typeSpeed: 80,
            loop: true,
            loopCount: Infinity,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);
    return (
        <div >
            <Container fluid>
                <Row>
                    <Col style={{ display: 'flex', alignItems: 'center', paddingLeft: 80 }}>
                        <h1 style={{ fontSize: 60, color: 'gray' }}>dress <span style={{ fontWeight: '700', color: '#404040' }}>UP</span> <br />stand <span style={{ fontWeight: '700', color: '#404040' }}>OUT</span> <br />be <span style={{ fontWeight: '700', color: '#404040' }} ref={el}></span></h1>
                    </Col>
                    <Col>
                        <img style={{ width: '50vw', borderRadius: 10 }} src='https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'></img>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                <Col lg={3} md={4} sm={6} className='product-element'>
                        <Link to={`/category/all`} style={{textDecoration:'none',color: 'black'}} >
                            <div className='category-div' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1628015081036-0747ec8f077a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")`,backgroundSize: 'cover',backgroundPosition: 'center',display: 'flex',justifyContent: 'stretch',alignItems: 'flex-end' }} >
                                <div style={{background: 'white',width: '100%',borderRadius: 10,padding: 15,display: 'flex',justifyContent:'space-between'}} >
                                    <h4 style={{ color: '#575757' }}>Shop All</h4>
                                    <img src='arrow.png' style={{width: '15%'}}></img>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={3} md={4} sm={6} className='product-element'>
                        <Link to={`/category/men`} style={{textDecoration:'none',color: 'black'}} >
                            <div className='category-div' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")`,backgroundSize: 'cover',backgroundPosition: 'center',display: 'flex',justifyContent: 'stretch',alignItems: 'flex-end' }} >
                                <div style={{background: 'white',width: '100%',borderRadius: 10,padding: 15,display: 'flex',justifyContent:'space-between'}} >
                                    <h4 style={{ color: '#575757' }}>Shop Men</h4>
                                    <img src='arrow.png' style={{width: '15%'}}></img>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={3} md={4} sm={6} className='product-element'>
                        <Link to={`/category/women`} style={{textDecoration:'none',color: 'black'}} >
                            <div className='category-div' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")`,backgroundSize: 'cover',backgroundPosition: 'center',display: 'flex',justifyContent: 'stretch',alignItems: 'flex-end' }} >
                                <div style={{background: 'white',width: '100%',borderRadius: 10,padding: 15,display: 'flex',justifyContent:'space-between'}} >
                                    <h4 style={{ color: '#575757' }}>Shop Women</h4>
                                    <img src='arrow.png' style={{width: '15%'}}></img>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={3} md={4} sm={6} className='product-element'>
                        <Link to={`/category/kids`} style={{textDecoration:'none',color: 'black'}} >
                            <div className='category-div' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1615531068122-80040baba3bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")`,backgroundSize: 'cover',backgroundPosition: 'center',display: 'flex',justifyContent: 'stretch',alignItems: 'flex-end' }} >
                                <div style={{background: 'white',width: '100%',borderRadius: 10,padding: 15,display: 'flex',justifyContent:'space-between'}} >
                                    <h4 style={{ color: '#575757' }}>Shop Kids</h4>
                                    <img src='arrow.png' style={{width: '15%'}}></img>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {data.map((ele) => {
                        return (
                            <Col lg={3} md={4} sm={6} className='product-element'>
                                <Link to={`/products/${ele.id}`} ><img src={ele.imageUrl} /></Link>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <div>
                                        <h4>{ele.title}</h4>
                                        <h2 style={{ marginTop: 5 }}>₹ {ele.price}</h2>
                                    </div>
                                    <img style={{ width: '10%', height: '30px', cursor: 'pointer' }} src='https://img.icons8.com/?size=512&id=85093&format=png' />
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
        //     </div>
        // </div>
    );
}

export default Home;
