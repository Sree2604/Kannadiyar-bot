import React, { useEffect, useState } from "react";

const Dummy = () => {
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);

    const getProductDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/getProduct/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchWishlist = async (id) => {
            try {
                const response = await fetch(`http://localhost:4000/getWishlist/?id=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && data.length > 0) {
                    setItems(data[0].whishlist);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist(1);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = items.map((val) => getProductDetails(val));
                const productsData = await Promise.all(productPromises);
                setProducts(productsData.filter(product => product !== null));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        if (items.length > 0) {
            fetchProducts();
        }
    }, [items]);

    return (
        <div>
            <h2>Products:</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <strong>Product Name:</strong> {product.product_category}<br />
                        <strong>Price:</strong> {product.mrp}<br />
                        {/* Display other product details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dummy;
