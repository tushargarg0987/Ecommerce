import { useEffect, useState } from "react"
import LoginPage from "../components/Login";
import { Container } from "react-bootstrap";
import axios from "axios";

function AdminPanel() {
    const [adminLogin, setAdminLogin] = useState(false);
    const [currTab, setCurrTab] = useState(1);
    const [addingUser, setAddingUser] = useState(false)
    const [addingProduct, setAddingProduct] = useState(false)
    const [paymentData, setPaymentData] = useState([]);
    const [productData, setProductData] = useState([])
    const [userData, setUserData] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategoty, setProductCategory] = useState('men');
    const [toRefresh, setToRefresh] = useState(true);



    useEffect(() => {
        axios.get('http://localhost:5000/userDetails').then((res) => {
            setUserData(res.data);
        })
        axios.get('http://localhost:5000/paymentDetails').then((res) => {
            setPaymentData(res.data);
        })
        axios.get('http://localhost:5000/productDetails').then((res) => {
            setProductData(res.data);
        })
    }, [toRefresh])

    if (!adminLogin) {
        return (<LoginPage head={"Admin Login"} setAdminLogin={setAdminLogin} />)
    }

    function addUser() {
        axios.post('http://localhost:5000/register', {
            username: newUsername,
            password: newPassword
        }).then(() => {
            if (toRefresh) {
                setToRefresh(false);
            } else {
                setToRefresh(true);
            }
        })
        setNewUsername('');
        setNewPassword('');
        setAddingUser(false)
    }

    function addProduct() {
        axios.post('http://localhost:5000/addProduct', {
            title: productTitle,
            imageUrl: productImg,
            price: productPrice,
            category: productCategoty
        }).then(() => {
            if (toRefresh) {
                setToRefresh(false);
            } else {
                setToRefresh(true);
            }
        })
        setProductTitle('');
        setProductImg('');
        setProductPrice('');
        setAddingProduct(false);
    }

    function deleteUser(username) {
        console.log(username);
        axios.post('http://localhost:5000/deleteUser', {
            username: username
        }).then(() => {
            if (toRefresh) {
                setToRefresh(false);
            } else {
                setToRefresh(true);
            }
        })
    }

    function deleteProduct(id) {
        axios.post('http://localhost:5000/deleteProduct', {
            id: id
        }).then(() => {
            if (toRefresh) {
                setToRefresh(false);
            } else {
                setToRefresh(true);
            }
        })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }} className="admin-heads">
                <h3 style={currTab === 1 ? { color: 'white', backgroundColor: 'black' } : {}} onClick={() => { setCurrTab(1) }}>Payments</h3>
                <h3 style={currTab === 2 ? { color: 'white', backgroundColor: 'black' } : {}} onClick={() => { setCurrTab(2) }}>Users</h3>
                <h3 style={currTab === 3 ? { color: 'white', backgroundColor: 'black' } : {}} onClick={() => { setCurrTab(3) }}>Add Product</h3>
            </div>
            <div style={{ width: '100%', padding: '0 5%' }}>
                <hr />
            </div>
            {currTab === 1 &&
                <div style={{ padding: '2% 5%' }}>
                    {paymentData.map((ele) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#c1c1c1', padding: 10, borderRadius: 10, margin: '10px 0' }}>
                                <h3>{ ele.username}</h3>
                                <h4>{ ele.date}</h4>
                                <h3 style={{ background: 'white', padding: 10, borderRadius: 10 }}>{ ele.amount}</h3>
                            </div>
                        )
                    })}
                </div>
            }
            {currTab === 2 && !addingUser &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10%' }}>
                        <button onClick={() => {
                            setAddingUser(true)
                        }} className="admin-add-btn" style={{ margin: '20px 0' }}>Add New User</button>
                    </div>
                    {userData.map((user) => {
                        return (
                            <div key={user.username} style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#c1c1c1', padding: '10px 5%', borderRadius: 10, margin: '10px 0' }}>
                                <h3>{user.username}</h3>
                                <button onClick={() => { deleteUser(user.username) }} className="admin-add-btn" style={{ backgroundColor: '#d13b30', padding: '1px 8px', fontSize: 28 }}>🗑</button>
                            </div>
                        )
                    })}

                </div>
            }
            {currTab === 2 && addingUser &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '50%', display: 'block' }} align="center">
                        <input className="admin-inputs" placeholder="Username" style={{ maxWidth: '400px' }} value={newUsername} onChange={(e) => { setNewUsername(e.target.value) }} />
                        <input className="admin-inputs" placeholder="Password" style={{ maxWidth: '400px' }} value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="admin-add-btn" style={{ backgroundColor: 'grey', marginRight: 20 }} onClick={() => {
                                setAddingUser(false)
                                setNewUsername('');
                                setNewPassword('');
                            }}>Cancel</button>
                            <button className="admin-add-btn" onClick={() => { addUser() }} >Add User</button>
                        </div>
                    </div>
                </div>
            }

            {currTab === 3 && !addingProduct &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10%' }}>
                        <button onClick={() => {
                            setAddingProduct(true)
                        }} className="admin-add-btn" style={{ margin: '20px 0' }}>Add New Product</button>
                    </div>
                    {productData.map((product) => {
                        return (
                            <div key={product.id} style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#c1c1c1', padding: '10px 5%', borderRadius: 10, margin: '10px 0' }}>
                                <img style={{ width: '20%', height: undefined, aspectRatio: 1.2, objectFit: 'cover', borderRadius: '3%' }} src={product.imageUrl}></img>
                                <h3 style={{ flex: 2, textAlign: 'center', overflow: 'hidden' }}>{product.title}</h3>
                                <h3 style={{ flex: 2, textAlign: 'center', overflow: 'hidden' }}>₹{product.price}</h3>
                                <button onClick={() => { deleteProduct(product.id) }} className="admin-add-btn" style={{ backgroundColor: '#d13b30', padding: '1px 8px', fontSize: 28, flex: 1, margin: '0 10px' }}>🗑</button>
                            </div>
                        )
                    })}

                </div>
            }
            {currTab === 3 && addingProduct &&
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '50%', display: 'block' }} align="center">
                            <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '400px' }}><label>Title</label></div>
                            <input className="admin-inputs" placeholder="Title" style={{ maxWidth: '400px' }} value={productTitle} onChange={(e) => { setProductTitle(e.target.value) }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '400px' }}><label>Image Url</label></div>
                            <input className="admin-inputs" placeholder="Image Url" style={{ maxWidth: '400px' }} value={productImg} onChange={(e) => { setProductImg(e.target.value) }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '400px' }}><label>Price</label></div>
                            <input className="admin-inputs" placeholder="Price" type="number" style={{ maxWidth: '400px' }} value={productPrice} onChange={(e) => { setProductPrice(e.target.value) }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '400px' }}><label>Category</label></div>
                            <select className="admin-inputs" style={{ maxWidth: '400px' }} onChange={(e)=>{setProductCategory(e.target.value);}}>
                                <option value={'men'}>Men</option>
                                <option value={'women'}>Women</option>
                                <option value={'kids'}>Kids</option>
                            </select>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="admin-add-btn" style={{ backgroundColor: 'grey', marginRight: 20 }} onClick={() => {
                                    setAddingProduct(false)
                                    setProductTitle('');
                                    setProductImg('');
                                    setProductPrice('');
                                }}>Cancel</button>
                                <button className="admin-add-btn" onClick={() => { addProduct() }} >Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminPanel