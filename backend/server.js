const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors')
const path = require("path");
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static("static"));
app.use(cors())
const stripe = require("stripe")('STRIPE_KEY', {
    apiVersion: "2022-08-01",
});

const paypal = require("@paypal/checkout-server-sdk")
const Environment = paypal.core.SandboxEnvironment
// process.env.NODE_ENV === "production"
//   ? paypal.core.LiveEnvironment
//   : paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
        'PAYPAL_KEY',
        'PAYPAL_KEY2'
    )
)

mongoose.connect("DATABASE_LINK");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    cartId: Number,
    cart: [{
        id: String,
        productId: String,
        quantity: String,
        size: String
    }],
});

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    imageUrl: String,
    price: String,
    category: String
})

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true, unique: true },
    username: String,
    date: Date,
    amount: String,
})

const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);
const Payment = new mongoose.model("Payment", paymentSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.post("/register", async function (req, res) {
    var hashedP;
    bcrypt
        .hash(req.body.password, saltRounds)
        .then(async (hash) => {
            hashedP = hash;
            try {

                var user = new User({
                    username: req.body.username,
                    password: hashedP,
                    cartId: 1
                });

                await user.save();
                flag = 0;
                res.send("Registered");
            }
            catch (err) {
                if (err.keyValue.username) {
                    console.log(err);
                    flag = 0;
                    res.send("Invalid User");
                }
            }
        }
        )
        .catch(err => console.error(err.message))
});

app.post('/deletingUser', async (req, res) => {
    try {
        const deleteStatus = await User.deleteOne({ usename: req.body.username });
        res.status(200).send('deleted')
    }
    catch {
        res.status(404).send("Error");
    }
})

app.post("/login", async function (req, res) {
    const foundUser = await User.find({ username: req.body.username })
    if (foundUser[0]) {
        const hash = foundUser[0].password;
        bcrypt
            .compare(req.body.password, hash)
            .then(response => {
                if (response) {
                    res.send("Success");
                }
                else {
                    res.status(201).send("Fail Password");
                }
            })
            .catch(err => console.error(err.message))
    }
    else {
        res.status(404).send("Fail");
    }

});

app.post('/addProduct', async function (req, res) {
    var flag = 1;
    while (flag) {
        try {
            var product = new Product({
                id: (Math.random() * 1000000).toFixed(0),
                title: req.body.title,
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                category: req.body.category
            });

            await product.save();
            flag = 0;
            res.send("Added");
        }
        catch (err) {
            if (err.keyValue.id) {
                flag = 1;
            }
        }
    }
})

app.post('/addPayment', async function (req, res) {
    var flag = 1;
    while (flag) {
        try {
            var payment = new Payment({
                id: (Math.random() * 1000000).toFixed(0),
                username: req.body.username,
                amount: req.body.amount,
                date: new Date()
            });

            await payment.save();
            flag = 0;
            res.send("Added");
        }
        catch (err) {
            if (err) {
                flag = 1;
            }
        }
    }
})

app.post('/deleteProduct', async (req, res) => {
    try {
        const deleteStatus = await Product.deleteOne({ id: req.body.id });
        res.status(200).send('deleted')
    }
    catch {
        res.status(404).send("Error");
    }
})

app.post('/addToCart', async (req, res) => {
    const foundUser = await User.find({ username: req.body.username })
    const oldCart = foundUser[0].cart;
    const newId = foundUser[0].cartId + 1;
    const newProduct = {
        id: `${newId}`,
        productId: req.body.productId,
        quantity: req.body.quantity,
        size: req.body.size
    }
    oldCart.push(newProduct);
    let doc = await User.findOneAndUpdate({ username: req.body.username }, { cart: oldCart });
    let doc2 = await User.findOneAndUpdate({ username: req.body.username }, { cartId: newId });
    res.status(200).send("OK")
})

app.post('/removeFromCart', async (req, res) => {
    const foundUser = await User.find({ username: req.body.username })
    const newCart = foundUser[0].cart.filter((ele) => {
        return ele.id !== req.body.id
    })
    let doc = await User.findOneAndUpdate({ username: req.body.username }, { cart: newCart });
    res.status(200).send("OK")
})

app.get('/paymentDetails', async function (req, res) {
    const allPayments = await Payment.find({});
    res.send(allPayments)
})

app.get('/userDetails', async function (req, res) {
    const allUsers = await User.find({});
    res.send(allUsers)
})

app.get('/cartDetails', async function (req, res) {
    const foundUser = await User.find({ username: req.query.username })
    res.send(foundUser[0])
})


app.get('/productDetails', async function (req, res) {
    const allProducts = await Product.find({});
    res.send(allProducts)
})

app.post("/create-order", async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest()

    request.prefer("return=representation")
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "INR",
                    value: req.body.amount,
                    breakdown: {
                        item_total: {
                            currency_code: "INR",
                            value: req.body.amount,
                        },
                    },
                },
            },
        ],
    })

    try {
        const order = await paypalClient.execute(request)
        res.json({ id: order.result.id })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get("/config", (req, res) => {
    res.send({
        publishableKey: 'PUBLISHABLE_KEY',
    });
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "INR",
            amount: parseInt(req.body.amount) * 100,
            automatic_payment_methods: { enabled: true },
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});


app.listen(5000, function () {
    console.log("Server started ");
});