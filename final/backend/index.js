const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const levenshtein = require("fast-levenshtein");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const sha256 = require("sha256");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
dotenv.config();

app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Specify the allowed origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
    "REDIRECT"
  ); // Specify the allowed HTTP methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "*"
  ); // Specify the allowed headers
  next();
});
app.use(express.json());

const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json({ limit: "50mb" })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/categories", express.static(path.join(__dirname, "categories")));
app.use("/carousels", express.static(path.join(__dirname, "carousels")));

const id = process.env.ID;
const PHONE_PE_HOST_URL = "https://api.phonepe.com/apis/hermes";
const SALT_INDEX = 1;
const SALT_KEY = "e77acd71-581a-4a4b-a19b-73599b654568";
const MERCHANT_ID = "M1N7YIUDDP8L";
const APP_BE_URL = "https://kannadiyar-bot.vercel.app/";

app.get("/pay", async function (req, res, next) {
  // Initiate a payment

  // Transaction amount
  const amount = +req.query.amount;

  // User ID is the ID of the user present in our application DB
  let userId = "MUID123";

  // Generate a unique merchant transaction ID for each transaction
  let merchantTransactionId = uniqid();

  // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
  let normalPayLoad = {
    merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
    merchantTransactionId: merchantTransactionId,
    merchantUserId: userId,
    amount: amount * 100, // converting to paise
    redirectUrl: `${APP_BE_URL}/payment/validate/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  // make base64 encoded payload
  let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
  let base64EncodedPayload = bufferObj.toString("base64");

  // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
  let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
  let sha256_val = sha256(string);
  let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

  axios
    .post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      {
        request: base64EncodedPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    )
    .then(function (response) {
      console.log("response->", JSON.stringify(response.data));
      // return res.json(response.data)
      res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
      res.send(error);
    });
});

// endpoint to check the status of payment
app.get("/payment/validate/:merchantTransactionId", async function (req, res) {
  const { merchantTransactionId } = req.params;
  // check the status of the payment using merchantTransactionId
  if (merchantTransactionId) {
    let statusUrl =
      `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
      merchantTransactionId;

    // generate X-VERIFY
    let string =
      `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    axios
      .get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": merchantTransactionId,
          accept: "application/json",
        },
      })
      .then(function (response) {
        console.log("response->", response.data);
        if (response.data && response.data.code === "PAYMENT_SUCCESS") {
          // redirect to FE payment success status page
          res.send(response.data);
        } else {
          // redirect to FE payment failure / pending status page
        }
      })
      .catch(function (error) {
        // redirect to FE payment failure / pending status page
        res.send(error);
      });
  } else {
    res.send("Sorry!! Error");
  }
});

// Endpoint to fetch all products
app.get("/", async (req, res) => {
  try {
    // Query to select all records from the 'product_details' table
    const qry = await pool.query("SELECT * FROM product_details");

    // Return the fetched product details as a JSON response
    res.json(qry.rows);
  } catch (err) {
    // If an error occurs during database query execution, log the error
    console.error(err.message);
    // Handle the error (no specific response sent to the client)
  }
});

// Endpoint to add or remove a product to/from the user's cart (wishlist)
app.post("/addToCart", async (req, res) => {
  const { prodId, custId, quantity } = req.body; // Extracting parameters from the query
  const { action } = req.query;

  try {
    // Handling different actions: add or delete a product from the cart
    if (action === "add") {
      // Check if the product already exists in the user's cart
      const selecQry = await pool.query(
        "SELECT * FROM customer_cart WHERE product_id = $1 AND customer_id = $2",
        [prodId, custId]
      );

      // If the product exists in the cart, return a 409 (Conflict) status
      if (selecQry.rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Product already exists in wishlist" });
      } else {
        // If the product does not exist in the cart, insert it into the cart and return a 201 (Created) status
        await pool.query(
          "INSERT INTO customer_cart (product_id, customer_id, quantity) VALUES ($1, $2,$3)",
          [prodId, custId, quantity]
        );
        return res
          .status(201)
          .json({ message: "Product added to wishlist successfully" });
      }
    } else if (action === "delete") {
      // Delete the product from the user's cart based on product ID and customer ID
      const deleteQry = await pool.query(
        "DELETE FROM customer_cart WHERE product_id = $1 AND customer_id = $2",
        [prodId, custId]
      );

      // If no rows were affected by the deletion, return a 404 (Not Found) status
      if (deleteQry.rowCount === 0) {
        return res.status(404).json({ error: "Product not found in wishlist" });
      } else {
        // If the product was successfully deleted, return a 200 (OK) status
        return res
          .status(200)
          .json({ message: "Product removed from wishlist successfully" });
      }
    } else {
      // If an invalid action is provided, return a 400 (Bad Request) status
      return res.status(400).json({
        error: 'Invalid action. Allowed actions are "add" and "delete"',
      });
    }
  } catch (error) {
    // If an error occurs during execution, log the error (no specific response sent to the client)
    console.log(error);
  }
});

app.post('/codOrder', async (req, res) => {
  const { custId, addressId, cartItems } = req.body;
  console.log(addressId)

  try {
    // Call the service function to create the order
    await pool.query('BEGIN');

    const orderId = uuidv4(); // Generate a unique order ID

    const addressQry = await pool.query("SELECT * FROM customer_address WHERE id = $1", [addressId]);
    if (addressQry.rows.length === 0) {
      // If no address found, respond with an appropriate error message
      return res.status(404).json({ message: 'Address not found.' });
    }

    const result = addressQry.rows[0];

    const address = result.address + result.locality + result.town + result.district + result.state + result.pincode;
    const phoneNumber = result.phone;
    const customerName = result.name;


    for (const item of cartItems) {
      const orderDetailsQuery = `
        INSERT INTO order_details (order_id, cust_id, address, phone_number, customer_name, prod_id, product_name, unit_price, quantity, status, checkout_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)
      `;
      console.log(item)
      const orderDetailsValues = [
        orderId,
        custId,
        address,
        phoneNumber,
        customerName,
        item.id,
        item.product_name,
        item.mrp,
        item.quantity,
        'Pending', // Assuming 'Pending' is the initial status for a new order
        'Cash on Delivery'
      ];
      await pool.query(orderDetailsQuery, orderDetailsValues);
    }

    await pool.query("DELETE FROM customer_cart WHERE customer_id = $1", [custId])
    await pool.query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error creating COD order:', error);
    res.status(500).json({ message: 'Failed to place order. Please try again later.' });
  }
});

app.get('/fetchOrder/:custId', async (req, res) => {
  try {
    const { custId } = req.params;
    console.log(custId)
    const custOrders = await pool.query("SELECT * FROM order_details WHERE cust_id = $1", [custId]);
    const result = custOrders.rows
    console.log(result)
    res.status(201).json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error...!" })
  }
})

app.get("/calcTariff", async (req, res) => {
  const { addressId, subWeight } = req.query;
  try {
    const fetchState = await pool.query(
      "SELECT state FROM customer_address WHERE id = $1",
      [addressId]
    );
    const userState = fetchState.rows[0].state;

    const regionalOne = ["Tamil Nadu", "Andhra Pradesh", "Karnataka"];
    const regionalTwo = [
      "Northeast",
      "Jammu and Kashmir",
      "Kerala",
      "Andaman and Nicobar Islands",
    ];

    let result = "";
    if (regionalOne.includes(userState)) {
      result = "R1";
    } else if (regionalTwo.includes(userState)) {
      result = "R2";
    } else {
      result = "ROI";
    }

    const tarrifCharges = {
      R1: {
        500: 50,
        1000: 60,
        1500: 80,
        2000: 100,
        2500: 110,
        3000: 120,
        3500: 130,
        4000: 150,
        4500: 165,
        5000: 180,
        6000: 210,
        7000: 240,
        8000: 270,
        9000: 300,
        10000: 330,
        11000: 360,
        12000: 390,
        13000: 420,
        14000: 450,
        15000: 470,
        16000: 500,
        17000: 525,
        18000: 550,
        19000: 575,
        20000: 600,
      },
      ROI: {
        500: 60,
        1000: 80,
        1500: 100,
        2000: 140,
        2500: 170,
        3000: 200,
        3500: 230,
        4000: 260,
        4500: 290,
        5000: 320,
        6000: 370,
        7000: 420,
        8000: 470,
        9000: 510,
        10000: 550,
        11000: 590,
        12000: 630,
        13000: 670,
        14000: 710,
        15000: 750,
        16000: 790,
        17000: 830,
        18000: 870,
        19000: 910,
        20000: 950,
      },
      R2: {
        500: 70,
        1000: 100,
        1500: 140,
        2000: 180,
        2500: 220,
        3000: 260,
        3500: 295,
        4000: 320,
        4500: 350,
        5000: 380,
        6000: 450,
        7000: 520,
        8000: 580,
        9000: 620,
        10000: 650,
        11000: 700,
        12000: 750,
        13000: 800,
        14000: 850,
        15000: 900,
        16000: 950,
        17000: 1000,
        18000: 1050,
        19000: 1100,
        20000: 1150,
      },
    };

    const deliveryCharge = tarrifCharges[result][subWeight];
    res.status(200).json({ deliveryCharge });
  } catch (error) {
    res.status(500).json({ erro: "Internal Server Error...!!" });
  }
});

// Endpoint to fetch items in the user's cart (wishlist) based on user ID
app.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params; // Extracting userId from request parameters

  try {
    // SQL query to retrieve items in the user's cart (wishlist) from the database
    const query = `
      SELECT p.id, p.product_name, p.description, p.mrp, p.stock,p.weight, p.image, c.quantity, c.customer_id
      FROM product_details p
      INNER JOIN customer_cart c ON p.id = c.product_id
      WHERE c.customer_id = $1
    `;

    // Execute the SQL query using a database pool, passing the userId as a parameter to filter the results
    const wishlistItems = await pool.query(query, [userId]);

    // Return the fetched wishlist items as a JSON response with status 200 (OK)
    res.status(200).json(wishlistItems.rows);
  } catch (error) {
    // If an error occurs during the database query execution, log the error and send a 500 (Internal Server Error) response
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ error: "Failed to fetch wishlist items" });
  }
});

// Endpoint to update the quantity of a product in the user's cart
app.put("/updateQuantity", async (req, res) => {
  try {
    const { prodId, custId } = req.query; // Extracting product and customer IDs from the query parameters
    const { quantity } = req.body; // Extracting the new quantity value from the request body

    // Update the quantity of a specific product in the user's cart using an SQL UPDATE query
    const qry = await pool.query(
      "UPDATE customer_cart SET quantity = $1 WHERE customer_id = $2 AND product_id = $3",
      [quantity, custId, prodId]
    );

    // Return the result of the SQL update operation as a JSON response
    res.json(qry.rows);
  } catch (error) {
    // If an error occurs during the execution, log the error (no specific response sent to the client)
    console.error(error.message);
  }
});

// Endpoint to fetch product details by ID
app.get("/getProduct/:id", async (req, res) => {
  const { id } = req.params; // Extracting product ID from request parameters
  try {
    // Query to select product details based on the provided product ID
    const qry = await pool.query(
      "SELECT * FROM product_details WHERE id = $1",
      [id]
    );

    // Return the fetched product details as a JSON response
    res.json(qry.rows);
  } catch (err) {
    // If an error occurs during the database query execution, log the error (no specific response sent to the client)
    console.error(err.message);
  }
});

// Endpoint to fetch ratings (count and average) for a specific product
app.get("/product/:productId/ratings", async (req, res) => {
  try {
    const { productId } = req.params; // Extracting product ID from request parameters

    // Query to retrieve count and average of ratings for the specified product
    const ratingsQuery = await pool.query(
      `SELECT COUNT(*) AS rating_count, AVG(star_rating) AS avg_rating FROM product_ratings WHERE product_id = $1`,
      [productId]
    );

    // Extract rating count and average rating from the database response
    const { rating_count, avg_rating } = ratingsQuery.rows[0];

    // Return the count and average rating as a JSON response
    res.json({ rating_count, avg_rating });
  } catch (error) {
    // If an error occurs during the database query execution, log the error and send a 500 (Internal Server Error) response
    console.error("Error fetching ratings:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint to fetch all ratings for a specific product
app.get("/ratings", async (req, res) => {
  const { prodId } = req.query; // Extracting product ID from query parameters
  try {
    // Query to retrieve all ratings for the specified product
    const ratingsQuery = await pool.query(
      `SELECT * FROM product_ratings WHERE product_id = $1`,
      [prodId]
    );

    // Return the fetched ratings as a JSON response
    res.json(ratingsQuery.rows);
  } catch (error) {
    // If an error occurs during the database query execution, log the error and send a 500 (Internal Server Error) response
    console.error("Error fetching ratings:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint to get products based on category and subcategory
app.get("/getCategoryProducts", async (req, res) => {
  const { category, subCategory } = req.query; // Extracting category and subcategory from query parameters

  try {
    // Query to select products from the 'product_details' table based on category or subcategory
    const qry = await pool.query(
      "SELECT * FROM product_details WHERE product_category = $1 OR sub_category = $2",
      [category, subCategory]
    );

    // Return the fetched products as a JSON response
    res.json(qry.rows);
  } catch (error) {
    // If an error occurs during the database query execution, log the error (no specific response sent to the client)
    console.log(error);
  }
});

// Endpoint for customer login
app.get("/customerLogin", async (req, res) => {
  const { email, password } = req.query; // Extracting email and password from query parameters

  try {
    // Query to retrieve user data based on the provided email
    const qry = await pool.query(
      "SELECT * FROM customer_details WHERE email=$1",
      [email]
    );
    const userData = qry.rows[0]; // Extracting the user data from the query result

    if (!userData) {
      // If no user data found for the provided email, return a 404 (Not Found) status
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = userData.password; // Extracting hashed password from user data

    // Comparing the provided password with the hashed password using bcrypt
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        // If an error occurs during password comparison, log the error and send a 500 (Internal Server Error) response
        console.error(err.message);
        return res.status(500).send("Error comparing passwords");
      }
      if (result) {
        // If the passwords match, send the user data as a JSON response (successful login)
        res.json(userData);
      } else {
        // If the passwords don't match, return a 401 (Unauthorized) status for invalid credentials
        res.status(401).json({ message: "Password is incorrect...!" });
      }
    });
  } catch (err) {
    // If an error occurs during the execution, log the error and send a 500 (Internal Server Error) response
    console.error(err.message);
    res.status(500).send("Error occurred");
  }
});

// Endpoint to register a new customer
app.post("/registerCustomer", async (req, res) => {
  const { firstName, lastName, email, passWord, Sectques, Sectans, phone } =
    req.body; // Extracting user details from request body

  try {
    // Generating a salt and hashing the provided password using bcrypt for secure storage
    const selecQry = await pool.query(
      "SELECT email FROM customer_details WHERE email=$1",
      [email]
    );
    if (selecQry.rowCount > 0) {
      res.status(409).send("Email Already Exists");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passWord, salt, async (err, hash) => {
          try {
            const hashedPassword = hash; // Storing the hashed password

            // Inserting customer details into the database
            const qry = await pool.query(
              "INSERT INTO customer_details (first_name, last_name, phone_number, email, password, secret_ques, secret_ques_ans) VALUES ($1, $2, $3, $4, $5, $6, $7)",
              [
                firstName,
                lastName,
                phone,
                email,
                hashedPassword,
                Sectques,
                Sectans,
              ]
            );
            res.json(qry.rows); // Sending the inserted data as a JSON response
          } catch (error) {
            console.log(error);
            res.status(500).send("Error while inserting data"); // Handling database insertion error
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred"); // Handling general error
  }
});

// Endpoint to get customer details by ID
app.get("/customer/:id", async (req, res) => {
  const { id } = req.params; // Extracting customer ID from request parameters

  try {
    // Querying the database to fetch specific customer details based on the provided customer ID
    const qry = await pool.query(
      "SELECT first_name, last_name, email, phone_number, cust_id FROM customer_details WHERE cust_id = $1",
      [id]
    );
    res.json(qry.rows); // Sending fetched customer details as a JSON response
  } catch (error) {
    // If an error occurs during the database query execution, handle it
    console.log(error);
    res.status(500).send("Error occurred"); // Handling general error
  }
});

// Endpoint to fetch addresses for a customer based on customer ID
app.get("/getAddress", async (req, res) => {
  const { custId } = req.query; // Extracting customer ID from query parameters

  try {
    // Querying the database to retrieve addresses associated with the provided customer ID
    const qry = await pool.query(
      "SELECT * FROM customer_address WHERE cust_id = $1",
      [custId]
    );

    // Sending the fetched addresses as a JSON response
    res.json(qry.rows);
  } catch (error) {
    console.log(error); // Logging database query errors
  }
});

// Endpoint to add a new address for a customer
app.post("/addAddress", async (req, res) => {
  const { custId } = req.query; // Extracting customer ID from query parameters
  const {
    name,
    phone,
    pincode,
    locality,
    address,
    state,
    district,
    town,
    email,
    others,
  } = req.body; // Extracting address details from request body

  try {
    // Inserting a new address record into the 'customer_address' table
    const qry = await pool.query(
      "INSERT INTO customer_address (cust_id, name, phone, pincode, locality, address, state, district, town, email, others) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        custId,
        name,
        phone,
        pincode,
        locality,
        address,
        state,
        district,
        town,
        email,
        others,
      ]
    );

    // Sending the inserted data as a JSON response
    res.json(qry.rows);
  } catch (error) {
    console.log(error); // Logging database insertion errors
  }
});

// Endpoint to edit/update an existing address
app.put("/editAddress", async (req, res) => {
  const { addressId } = req.query; // Extracting address ID from query parameters
  const {
    name,
    phone,
    pincode,
    locality,
    address,
    state,
    district,
    town,
    email,
    others,
  } = req.body; // Extracting updated address details from request body

  try {
    // Updating an address in the 'customer_address' table based on the provided address ID
    const qry = await pool.query(
      "UPDATE customer_address SET name = $1, phone = $2, pincode = $3, locality = $4, address = $5, state = $6, district = $7, town = $8, email = $9, others = $10 WHERE id = $11",
      [
        name,
        phone,
        pincode,
        locality,
        address,
        state,
        district,
        town,
        email,
        others,
        addressId,
      ]
    );

    // Sending the updated data as a JSON response
    res.json(qry.rows);
  } catch (error) {
    console.log(error); // Logging database update errors
  }
});

// Endpoint to delete an address by ID
app.delete("/delAddress/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extracting address ID from request parameters

    // Deleting an address from the 'customer_address' table based on the provided address ID
    const qry = await pool.query("DELETE FROM customer_address WHERE id = $1", [
      id,
    ]);

    // Sending a success message as a JSON response after successful deletion
    res.json("delete successful");
  } catch (error) {
    console.log(error); // Logging database deletion errors
  }
});

// Endpoint to fetch all categories
app.get("/categories", async (req, res) => {
  try {
    // Query to select all categories from the 'category' table
    const qry = await pool.query("SELECT * FROM category");

    // Sending the fetched categories as a JSON response
    res.json(qry.rows);
  } catch (error) {
    console.log(error); // Logging database query errors
  }
});

// Endpoint to manage wishlist (add or delete products)
app.post("/wishlist", async (req, res) => {
  const custId = req.body.custId; // Extracting customer ID from query parameters
  const product = req.body.product; // Extracting product ID from query parameters
  const action = req.query.action; // Extracting action (add/delete) from query parameters

  try {
    if (action === "add") {
      // Checking if the product already exists in the wishlist for the customer
      const selectQry = await pool.query(
        "SELECT * FROM wishlist WHERE prod_id = $1 AND cust_id = $2",
        [product, custId]
      );

      if (selectQry.rows.length > 0) {
        // Returning an error response if the product already exists in the wishlist
        return res
          .status(409)
          .json({ error: "Product already exists in wishlist" });
      } else {
        // Adding the product to the wishlist for the customer
        await pool.query(
          "INSERT INTO wishlist (prod_id, cust_id) VALUES ($1, $2)",
          [product, custId]
        );
        return res
          .status(201)
          .json({ message: "Product added to wishlist successfully" });
      }
    } else if (action === "delete") {
      // Deleting the product from the wishlist for the customer
      const deleteQry = await pool.query(
        "DELETE FROM wishlist WHERE prod_id = $1 AND cust_id = $2",
        [product, custId]
      );

      if (deleteQry.rowCount === 0) {
        // Returning an error response if the product is not found in the wishlist
        return res.status(404).json({ error: "Product not found in wishlist" });
      } else {
        return res
          .status(200)
          .json({ message: "Product removed from wishlist successfully" });
      }
    } else {
      // Handling the case of an invalid action (neither add nor delete)
      return res.status(400).json({
        error: 'Invalid action. Allowed actions are "add" and "delete"',
      });
    }
  } catch (error) {
    console.log(error); // Logging any errors that occur during the process
  }
});

// Endpoint to fetch wishlist items for a specific user
app.get("/api/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // SQL query to retrieve wishlist items for the given user ID by joining 'product_details' and 'wishlist' tables
    const query = `
      SELECT p.id, p.product_name, p.description, p.mrp, p.stock, p.image
      FROM product_details p
      INNER JOIN wishlist w ON p.id = w.prod_id
      WHERE w.cust_id = $1
    `;

    const wishlistItems = await pool.query(query, [userId]); // Executing the query to fetch wishlist items
    res.status(200).json(wishlistItems.rows); // Sending fetched wishlist items as a JSON response
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ error: "Failed to fetch wishlist items" }); // Handling error in fetching wishlist items
  }
});

// Endpoint to add a rating and review for a product
app.post("/rateProduct", async (req, res) => {
  const { prodId, rating, comment, custId, title } = req.body; // Extracting data from request body

  try {
    // Fetching customer's first and last name based on customer ID
    const nameQry = await pool.query(
      "SELECT first_name, last_name FROM customer_details WHERE cust_id = $1",
      [custId]
    );
    const { first_name, last_name } = nameQry.rows[0];
    const name = first_name + " " + last_name; // Concatenating first name and last name

    // Inserting a new record into 'product_ratings' table with provided rating, review, and customer name
    const qry = await pool.query(
      "INSERT INTO product_ratings (product_id, star_rating, product_review, customer_name, title) VALUES ($1, $2, $3, $4, $5)",
      [prodId, rating, comment, name, title]
    );
    res.json(qry.rows); // Sending response with inserted data
  } catch (error) {
    console.log(error); // Handling errors during the rating insertion process
  }
});

app.get("/fetchSecret", async (req, res) => {
  try {
    const { email } = req.query;
    const qry = await pool.query(
      "SELECT secret_ques FROM customer_details WHERE email = $1",
      [email]
    );
    res.json({ secret_quest: qry.rows[0].secret_ques });
  } catch (error) {
    console.log(error);
  }
});

app.post("/checkAns", async (req, res) => {
  try {
    const { email, answer, passWord } = req.body;
    const qry = await pool.query(
      "SELECT secret_ques_ans FROM customer_details WHERE email = $1",
      [email]
    );
    console.log(email, answer, passWord);
    const { secret_ques_ans } = qry.rows[0];
    if (answer == secret_ques_ans) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passWord, salt, async (err, hash) => {
          try {
            const hashedPassword = hash; // Storing the hashed password

            // Inserting customer details into the database
            const qry = await pool.query(
              "UPDATE customer_details SET password = $1 WHERE email = $2",
              [hashedPassword, email]
            );
            res.json(qry.rows); // Sending the inserted data as a JSON response
          } catch (error) {
            console.log(error);
            res.status(500).send("Error while updating data"); // Handling database insertion error
          }
        });
      });
    } else {
      res.status(500).send("Secret answer is not correct...");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while checking the answer");
  }
});
// Endpoint to search for products based on user input
app.get("/search/:userInput", async (req, res) => {
  const { userInput } = req.params; // Extracting user input from request parameters

  try {
    // Searching for an exact match of the product name using ILIKE in the 'product_details' table
    const exactMatch = await pool.query(
      "SELECT * FROM product_details WHERE product_name ILIKE $1",
      [userInput]
    );

    if (exactMatch.rows.length > 0) {
      // If an exact match is found, return the matched products
      res.json(exactMatch.rows);
    } else {
      // If no exact match is found, perform a fuzzy search using Levenshtein distance

      // Fetch all products from the 'product_details' table
      const allProducts = await pool.query("SELECT * FROM product_details");
      let suggestedTerms = [];

      // Iterate through all products to calculate Levenshtein distance and suggest relevant terms
      allProducts.rows.forEach((product) => {
        const distance = levenshtein.get(
          String(product.product_name).toLowerCase(),
          String(userInput).toLowerCase()
        );

        // Checking if the distance is within a certain threshold (here, 10)
        if (distance <= 10) {
          suggestedTerms.push({ exactMatch: false, product, distance });
        }
      });

      // Sorting suggested terms based on distance and selecting top 3 suggestions
      suggestedTerms.sort((a, b) => a.distance - b.distance);
      const topSuggestions = suggestedTerms.slice(0, 3);

      res.json({ topSuggestions }); // Sending top suggested terms as a JSON response
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors during the search process
  }
});
// Endpoint to generate and return a JSON Web Token (JWT)
app.get("/token", async (req, res) => {
  // Creating a JWT using the `jwt.sign()` method from a user ID, secret key, and expiration time
  // Replace `id` and `secretKey` with actual user ID and secret key respectively
  const token = jwt.sign({ userId: id }, secretKey, { expiresIn: "1h" });

  // Sending the generated token as a JSON response
  res.json({ token });
});

//Admin Panel endpoints starts...

// Multer configuration for uploading product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination for product images
  },
  filename: function (req, file, cb) {
    // Generating a unique filename for uploaded product images
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const carouselStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "carousels/"); // Destination for product images
  },
  filename: function (req, file, cb) {
    // Generating a unique filename for uploaded product images
    cb(null, file.originalname);
  },
});

// Multer configuration for uploading category images
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "categories/"); // Destination for category images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keeping original filename for category images
  },
});

// Multer middleware instances for handling file uploads based on storage configurations
const upload = multer({ storage: storage }); // For product images
const categoryUpload = multer({ storage: categoryStorage }); // For category images
const carouselUpload = multer({ storage: carouselStorage });

// Endpoint to add product details along with images
app.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // Single cover image
    { name: "images", maxCount: 5 }, // Multiple images
  ]),
  async (req, res) => {
    // Extracting product details and uploaded image filenames from request body and files
    const {
      productName,
      productCategory,
      productMrp,
      productWeight,
      description,
      stock,
      tax,
      createdAt,
      modifiedAt,
      subCategory,
      tamilName,
      botanicalName,
      discountPrice,
    } = req.body;
    const coverImage = req.files["coverImage"][0].filename; // Extracting cover image filename
    let images = [];
    if (req.files["images"] && Array.isArray(req.files["images"])) {
      images = req.files["images"].map((file) => file.filename); // Extracting multiple image filenames
    } else {
      console.error("No images uploaded or incorrect field name used.");
    }

    try {
      // Inserting product details and uploaded image filenames into the database
      const qry = await pool.query(
        `INSERT INTO product_details 
    (product_name, product_category, mrp, weight, description, stock, tax, sub_category, created_at, modified_at, image, images, tamil_name,botanical_name,discount_price) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15)`,
        [
          productName,
          productCategory,
          productMrp,
          productWeight,
          description,
          stock,
          tax,
          subCategory,
          createdAt,
          modifiedAt,
          coverImage,
          images,
          tamilName,
          botanicalName,
          discountPrice,
        ]
      );
      res.json(qry); // Sending response with query result
    } catch (err) {
      console.error("Error uploading images:", err.message);
      res.status(500).json({ error: "Error uploading images" }); // Handling error in image upload process
    }
  }
);

// Endpoint to add a new category
app.post("/addCategory", async (req, res) => {
  try {
    // Inserting a new category into the database
    const qry = await pool.query(
      "INSERT INTO category (category, sub_category) VALUES ($1, $2)",
      [req.body.category, req.body.subCategory]
    );

    // Fetching the newly inserted category's ID from the database
    const selCat = await pool.query(
      "SELECT * FROM category WHERE category = $1",
      [req.body.category]
    );
    const catId = selCat.rows[0].id; // Extracting the ID of the newly inserted category
    res.json({ id: catId }); // Sending the ID of the newly inserted category as a JSON response
  } catch (error) {
    console.log(error); // Handling errors that occur during the category insertion process
  }
});

// Endpoint to upload an image for a specific category
app.post(
  "/addCatImage",
  categoryUpload.single("coverImage"),
  async (req, res) => {
    try {
      // Updating the image field for a specific category in the database
      console.log(req.file.filename, req.body.id);
      const qry = await pool.query(
        "UPDATE category SET image = $1 WHERE id = $2",
        [req.file.filename, req.body.id]
      );
      res.json(qry.rows[0]); // Sending response with query result
    } catch (error) {
      console.log(error); // Handling errors that occur during the category image upload process
    }
  }
);

// Endpoint to update product details based on the provided ID
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productCategory,
    productWeight,
    productMrp,
    description,
    stock,
    tax,
    tamilName,
    botanicalName,
    discountPrice,
    subCategory,
  } = req.body;
  try {
    // Updating product details in the database for the specified ID
    const query = await pool.query(
      "UPDATE product_details SET product_name =$1, product_category=$2, weight=$3, mrp=$4, description=$5, stock=$6, tax=$7, tamil_name=$8, botanical_name=$9, discount_price=$10, sub_category = $11 WHERE id=$12",
      [
        productName,
        productCategory,
        productWeight,
        productMrp,
        description,
        stock,
        tax,
        tamilName,
        botanicalName,
        discountPrice,
        subCategory,
        id,
      ]
    );
    res.json(query); // Sending response with query result
  } catch (error) {
    console.log(error); // Handling errors that occur during the update process
  }
});

// Endpoint to delete a product based on the provided ID
app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Deleting a product from the database based on the specified ID
    const qry = await pool.query("DELETE FROM product_details WHERE id=$1", [
      id,
    ]);
    res.json("delete successful"); // Sending success message upon successful deletion
  } catch (error) {
    console.log(error); // Handling errors that occur during the deletion process
  }
});

// Endpoint to update sub-category for a specific category
app.put("/subCategory", async (req, res) => {
  const { cId } = req.query; // Extracting category ID from query parameters
  const { category, sub_category } = req.body; // Extracting category, sub-category from request body
  try {
    // Updating sub-category for the specified category ID in the 'category' table
    const qry = await pool.query(
      "UPDATE category SET category = $1, sub_category = $2 WHERE id = $3",
      [category, sub_category, cId]
    );
    res.json(qry.rows); // Sending response with query result
  } catch (error) {
    console.log(error); // Handling errors that occur during the update process
  }
});

// Endpoint to perform admin login based on username
app.get("/login/:userName", async (req, res) => {
  const { userName } = req.params; // Extracting username from URL parameters
  try {
    // Querying the 'admin' table to retrieve admin information based on the provided username
    const qry = await pool.query("SELECT * FROM admin WHERE username = $1", [
      userName,
    ]);
    res.json(qry.rows); // Sending response with query result (admin details)
  } catch (err) {
    console.error(err.message); // Handling errors that occur during the login process
  }
});

app.post(
  "/addcarousels",
  carouselUpload.fields([
    { name: "carouselImage1", maxCount: 1 },
    { name: "carouselImage2", maxCount: 1 },
    { name: "carouselImage3", maxCount: 1 },
    { name: "poster1", maxCount: 1 },
    { name: "poster2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        productName1,
        productName2,
        productName3,
        productName4,
        productName5,
      } = req.body;

      const carouselImageName1 = req.files["carouselImage1"][0].filename;
      const carouselImageName2 = req.files["carouselImage2"][0].filename; // Corrected assignment
      const carouselImageName3 = req.files["carouselImage3"][0].filename; // Corrected assignment
      const posterImageName1 = req.files["poster1"][0].filename;
      const posterImageName2 = req.files["poster2"][0].filename;

      const carouselInserts = [
        { photo: carouselImageName1, pName: productName1 },
        { photo: carouselImageName2, pName: productName2 },
        { photo: carouselImageName3, pName: productName3 },
      ];
      const posterInserts = [
        { photo: posterImageName1, pName: productName4 },
        { photo: posterImageName2, pName: productName5 },
      ];
      await pool.query("DELETE FROM carousels");
      await pool.query("DELETE FROM poster");
      try {
        for (const carousel of carouselInserts) {
          await pool.query(
            "INSERT INTO carousels (photo, pid) SELECT $1 as photo, id FROM product_details WHERE product_name ILIKE $2",
            [carousel.photo, carousel.pName]
          );
        }

        for (const poster of posterInserts) {
          await pool.query(
            "INSERT INTO poster (photo, pid) SELECT $1 as photo, id FROM product_details WHERE product_name ILIKE $2",
            [poster.photo, poster.pName]
          );
        }

        res.status(200).send("Images inserted successfully.");
      } catch (error) {
        res.status(500).send("Error inserting images.");
        console.error("Error inserting images:", error);
      }
    } catch (error) {
      res.status(500).send("Error processing request.");
      console.error("Error processing request:", error);
    }
  }
);

app.delete("/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Delete category from the categories table
    const deleteCategoryQuery = "DELETE FROM category WHERE id = $1";
    await pool.query(deleteCategoryQuery, [categoryId]);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete endpoint for subcategory
app.delete(
  "/categories/:catId/subcategories/:subCategory",
  async (req, res) => {
    const { catId, subCategory } = req.params;

    try {
      const deleteSubcategoryQuery =
        "UPDATE category SET sub_category = array_remove(sub_category, $1) WHERE id = $2";
      const result = await pool.query(deleteSubcategoryQuery, [
        subCategory,
        catId,
      ]);

      if (result.rowCount > 0) {
        res.status(200).json({ message: "Subcategory deleted successfully" });
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get("/getCarousel", async (req, res) => {
  try {
    const carouselQry = await pool.query("SELECT * FROM carousels");
    res.json(carouselQry.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reviews");
    const reviews = result.rows;
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews", err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

app.post("/api/reviews", async (req, res) => {
  const { user, content } = req.body;
  try {
    const selecQry = await pool.query(
      "SELECT first_name,last_name FROM customer_details WHERE cust_id = $1",
      [user]
    );
    const { first_name, last_name } = selecQry.rows[0];
    const userName = first_name + " " + last_name;
    const result = await pool.query(
      "INSERT INTO reviews (user_name, content) VALUES ($1, $2) RETURNING *",
      [userName, content]
    );
    const newReview = result.rows[0];
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error adding review", err);
    res.status(500).json({ error: "Error adding review" });
  }
});

app.put("/reviews/:reviewId/replies", async (req, res) => {
  const { reviewId } = req.params;
  const { replyContent } = req.body;
  const userName = "Kannadiyar";

  try {
    // Insert the reply into the database
    const newReply = await pool.query(
      "UPDATE reviews SET replied_by = $1, replies = $2 WHERE id = $3",
      [userName, replyContent, reviewId]
    );

    res.json(newReply.rows[0]); // Return the newly added reply
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getPoster", async (req, res) => {
  try {
    const carouselQry = await pool.query("SELECT * FROM poster");
    res.json(carouselQry.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/searchSuggestion", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const result = await pool.query(
      "SELECT product_name FROM product_details WHERE product_name ILIKE $1 LIMIT 10",
      [`%${query}%`]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addCoupon", async (req, res) => {
  const { couponCode, discountPrice, expirationDate, min_purchase, maxCount } =
    req.body;
  if (
    !couponCode ||
    !discountPrice ||
    !expirationDate ||
    !min_purchase ||
    !maxCount
  ) {
    return res.status(400).json({ error: "Couponn code is required...!" });
  }
  try {
    const addCoupon = await pool.query(
      `INSERT INTO coupons (code, expirationDate,min_purchase,max_limit,discount) 
      VALUES ($1,$2,$3,$4,$5)
    `,
      [couponCode, expirationDate, min_purchase, maxCount, discountPrice]
    );
    return res.status(201).json({ message: "Coupon added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error...!" });
  }
});

app.delete("/delCoupon", async (req, res) => {
  const { couponId } = req.body;
  try {
    await pool.query("DELETE FROM coupons WHERE id = $1", [couponId]);
    return res
      .status(201)
      .json({ message: "Coupon deleted successfully...!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error...!" });
  }
});

app.get("/getCoupon", async (req, res) => {
  try {
    const allCoupons = await pool.query("SELECT * FROM coupons");
    return res.status(201).json(allCoupons.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error...!" });
  }
});

app.put("/editCoupon", async (req, res) => {
  const { couponCode, discountPrice, expirationDate, min_purchase, maxCount } =
    req.body;
  try {
    await pool.query(
      "UPDATE coupons SET code = $1, discount = $2, expirationDate = $3, min_purchase = $4, max_limit = $5 WHERE id = $6",
      [couponCode, discountPrice, expirationDate, min_purchase, maxCount]
    );
    return res.status(201).json({ message: "Coupon updated successfully...!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/coupon", async (req, res) => {
  const { couponCode, purchaseValue } = req.body;
  if (!couponCode) {
    return res.status(400).json({ error: "Coupon Code is required" });
  }
  try {
    const result = await pool.query("SELECT * FROM coupons Where code = $1", [
      couponCode,
    ]);
    const foundCoupon = result.rows[0];

    if (!foundCoupon) {
      console.error("Internal Server Error...!!");
      return res.status(400).json({ message: `Invalid Coupon Code` });
    }

    const currentDate = new Date();
    const expirationDate = new Date(foundCoupon.expirationDate);

    if (currentDate > expirationDate) {
      console.error("Internal Server Error...!!");
      return res.status(400).json({ message: `Coupon is expired` });
    }

    if (purchaseValue < foundCoupon.min_purchase) {
      console.error("Internal Server Error...!!");
      return res.status(400).json({
        message: `Minimum purchase of ${foundCoupon.min_purchase} is required`,
      });
    }

    if (foundCoupon.max_limit < 1) {
      console.error("Internal Server Error...!!");
      return res.status(400).json({ message: `Coupon usage limit reached` });
    }

    return res.status(200).json({
      discount: foundCoupon.discount,
      minimumPurchase: foundCoupon.min_purchase,
    });
    // setDiscount(foundCoupon.discount);
    // foundCoupon.currentUses += 1;
    // alert(`Coupon applied! You got ${foundCoupon.discount}% off`);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error...!!" });
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
