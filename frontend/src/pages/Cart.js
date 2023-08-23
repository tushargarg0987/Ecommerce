import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function CartPage({ data, username }) {
    const [cartData, setCartData] = useState({cart:[]});
    const navigate = useNavigate();
    const [toRefresh,setToRefresh] = useState(false)
    var total = 0;
    useEffect(() => {
        console.log(username);
        if (username) {
            axios.get(`http://localhost:5000/cartDetails?username=${username}`).then((res) => {
                setCartData(res.data);
            })
        } else {
            navigate('/login')
        }
        total = 0

    }, [toRefresh])

    function removeFromCart(id) {
        axios.post('http://localhost:5000/removeFromCart', {
            username: username,
            id: id
        }).then(() => {
            if (toRefresh) {
                setToRefresh(false)
            } else {
                setToRefresh(true)
            }
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10%' }}>
                        <button onClick={() => {
                    navigate(`/checkout/${total}`);
                        }} className="admin-add-btn" style={{ margin: '20px 0' }} >Checkout</button>
                    </div>
            {cartData.cart.map((product) => {
                {
                    for (let ele in data) {
                        if (product.productId === data[ele].id) {
                            total = total + (data[ele].price * parseFloat(product.quantity));
                            return (
                                <div key={product.id} style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#c1c1c1', padding: '10px 5%', borderRadius: 10, margin: '10px 0' }}>
                                    <img style={{ width: '20%', height: undefined, aspectRatio: 1.2, objectFit: 'cover', borderRadius: '3%' }} src={data[ele].imageUrl}></img>
                                    <div style={{width: '40%'}}>
                                    <div style={{display: 'flex',justifyContent: 'flex-start',flexDirection: 'column',width: '100%',padding: '0 20%'}}>
                                        <h3 style={{ flex: 2, textAlign: 'left', overflow: 'hidden' }}>{data[ele].title}</h3>
                                        
                                        
                                        <h3 style={{ flex: 2, textAlign: 'left', overflow: 'hidden' }}>Quantity : {product.quantity}</h3>
                                        <h3 style={{ flex: 2, textAlign: 'left', overflow: 'hidden' }}>Size : {product.size}</h3>
                                    </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
                                    <h3 style={{ flex: 2, textAlign: 'left', overflow: 'hidden',marginRight: '10%' }}>₹{data[ele].price * parseFloat(product.quantity)}</h3>
                                    <button onClick={() => { removeFromCart(product.id) }} className="admin-add-btn" style={{ backgroundColor: '#d13b30', padding: '1px 8px', fontSize: 28, margin: '0 10px',width: '50%' }}>🗑</button>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            })}
        </div>
    )
}

export default CartPage