import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"

function CategoryPage({ data }) {
    const { category } = useParams();
    const [catData, setCatData] = useState([]);
    useEffect(() => {
        if (category === 'all') {
            setCatData(data)
        } else {
            const newData = data.filter((ele) => {
                return ele.category === category
            })
            setCatData(newData)
        }
    },[category])

    return (
        <Container fluid>
            <Row>
                {catData.map((ele) => {
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
    )
}

export default CategoryPage