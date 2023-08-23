import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

function ProductPage({ data, username }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(10);
    const [size, setSize] = useState(null);
    const [cartText,setCartText] = useState('Add to cart')

    useEffect(() => {
        const foundProduct = data.find((ele) => {
            return ele.id === id;
        })
        setProduct(foundProduct)
    }, [id]);

    function addToCart() {
        axios.post('/addToCart', {
            productId: id,
            quantity: quantity,
            size: size,
            username: username
        })
        setCartText("Go to cart")
    }

    if (!product) {
        return <div>Loading... for {id}</div>;
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col align="center" lg={6} md={12} sm={12} style={{marginTop: 30}}>
                        <img style={{ width: '80%', aspectRatio: 1, height: undefined, objectFit: 'cover', borderRadius: 5 }} src={product.imageUrl}></img>
                    </Col>
                    <Col lg={6} md={12} sm={12}style={{display: 'flex',justifyContent: 'center',marginTop: 30,alignItems: 'center'}}>
                        <div style={{ paddingRight: '10%',width: '80%' }}>

                            <h2>{product.title}</h2>
                            <h6>a perfect clothing choice with excellent fabric designed and manufactured with precision</h6>
                            <hr />
                            <h1>₹{product.price}</h1>
                            <h6>Check out multiple payment options and choose as per your convinience</h6>
                            <hr />
                            <h5>Select Size</h5>
                            <div style={{ display: 'flex', flexDirection: 'row' }} className='size-container'>
                                <h3 onClick={() => { setSize('S') }} style={size === 'S' ? { backgroundColor: 'black', color: 'white' } : {}}>S</h3>
                                <h3 onClick={() => { setSize('M') }} style={size === 'M' ? { backgroundColor: 'black', color: 'white' } : {}}>M</h3>
                                <h3 onClick={() => { setSize('L') }} style={size === 'L' ? { backgroundColor: 'black', color: 'white' } : {}}>L</h3>
                                <h3 onClick={() => { setSize('XL') }} style={size === 'XL' ? { backgroundColor: 'black', color: 'white' } : {}}>XL</h3>
                            </div>
                            <hr />
                            <h5>Please select the quantity</h5>
                            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                                {quantity === 10 ? <button disabled="disabled" style={{ border: '1px solid gray', width: 40, height: 50, borderRight: 'none',borderTopLeftRadius: 20 ,borderBottomLeftRadius: 20}}>-</button> : <button style={{ border: '1px solid gray', width: 40, height: 50, borderRight: 'none', backgroundColor: 'white',borderTopLeftRadius: 20 ,borderBottomLeftRadius: 20 }} onClick={() => {
                                    setQuantity(quantity - 1);
                                }}>-</button>}
                                <input style={{ width: 40, borderLeft: 'none', borderRight: 'none', textAlign: 'center', padding: 0, borderTop: '1px solid gray',borderBottom: '1px solid black', margin: 0, height: 50, backgroundColor: 'white' }} type='number' value={quantity} disabled="disabled" />
                                <button style={{ border: '1px solid gray',borderTopRightRadius: 20 ,borderBottomRightRadius: 20, width: 40, height: 50, borderLeft: 'none', backgroundColor: 'white' }} onClick={() => {
                                    setQuantity(quantity + 1);
                                }}>+</button>
                            </div>
                            <p>*Minimum order quantity is 10</p>

                            <div style={{display: 'flex',justifyContent: 'space-around',marginTop: 30}}>
                                <button style={{backgroundColor: 'yellow',border:'none',fontSize: 28,fontWeight: '600',width: 250,borderRadius: 15,padding: 5}} onClick={()=>{navigate(`/checkout/${product.price * quantity}`)}}>
                                    Buy now
                                </button>
                                {cartText === "Add to cart" ? <button style={{backgroundColor: 'white',border:'1px solid black',fontSize: 28,fontWeight: '600',width: 250,borderRadius: 15,padding: 5}} onClick={()=>{addToCart()}}>
                                    Add to cart
                                </button> : <button style={{backgroundColor: 'white',border:'1px solid black',fontSize: 28,fontWeight: '600',width: 250,borderRadius: 15,padding: 5}} onClick={()=>{navigate('/cart')}}>
                                    Go to cart
                                </button>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductPage;
