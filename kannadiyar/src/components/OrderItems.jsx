import React, { useState, useEffect } from "react";
const baseurl = import.meta.env.VITE_API_URL;
const OrderItems = ({
  product_name,
  unit_price,
  weight,
  status,
  quantity,
  prod_id,
}) => {
  const [image, setImage] = useState();
  useEffect(() => {
    const fetchProdDetailsFromServer = async () => {
      const result = await fetch(`${baseurl}getProduct/${prod_id}`);
      const data = await result.json();
      console.log(data);
      setImage(data[0].image);
    };
    fetchProdDetailsFromServer();
  }, []);

  return (
    <tr className="border-b-2">
      <td className="p-4">
        <img
          src={`${baseurl}uploads/${image}`}
          alt={product_name}
          className="rounded-full w-16 h-16 object-cover"
        />
      </td>
      <td className="p-4">
        <h3 className="text-lg font-semibold">{product_name}</h3>
        <p>{weight}</p>
      </td>
      <td className="p-4">
        <p className="text-gray-600">₹{unit_price * quantity}</p>
      </td>
      <td className="p-4">
        <p className="text-gray-600">{status}</p>
      </td>
      <td className="p-4">
        <p className="text-gray-600">{quantity}</p>
      </td>
    </tr>
  );
};
const Orderitem = () => {
  const [orderedItems, setOrderItems] = useState([]);
  useEffect(() => {
    const getOrderedItems = async () => {
      const orderItemsFromServer = await fetchOrderItems();
      setOrderItems(orderItemsFromServer);
    };
    getOrderedItems();
    console.log(orderedItems);
  }, []);

  const custId = sessionStorage.getItem("custId");

  const fetchOrderItems = async () => {
    const res = await fetch(`${baseurl}fetchOrder/${custId}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  return (
    <div className="   lg:max-w-2xl lg:mx-auto lg:mt-8">
      <h2 className=" sm: mt-3 sm: font-content sm: text-xl sm: ml-2 lg:text-2xl lg:font-semibold lg:mb-4">
        Orders
      </h2>
      {orderedItems.length === 0 ? (
        <p className="text-gray-500">Your order is empty.</p>
      ) : (
        <table className="sm: w-fit  lg:w-full">
          <thead>
            <tr className="border-b-2">
              <th className="sm: p-2  lg:p-4">Image</th>
              <th className="sm: p-2  lg:p-4">Name</th>
              <th className="sm: p-2  lg:p-4">Price</th>
              <th className="sm: p-2  lg:p-4">Status</th>
              <th className="sm: p-2  lg:p-4">Qty</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item, index) => (
              <OrderItems key={index} {...item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orderitem;
