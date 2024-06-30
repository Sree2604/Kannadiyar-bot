import React from "react";

const WishlistItem = ({ name, price, image, detail, status }) => (
  <tr className="border-b-2">
    <td className="p-4">
      <img
        src={image}
        alt={name}
        className="rounded-full w-16 h-16 object-cover"
      />
    </td>
    <td className="p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{detail}</p>
    </td>
    <td className="p-4">
      <p className="text-gray-600">${price}</p>
    </td>
    <td className="p-4">
      <p className="text-gray-600">{status}</p>
    </td>
  </tr>
);

const WishlistItems = () => {
  const wishlistItems = [
    {
      name: "Product 1",
      price: 19.99,
      detail: "Kannadiyar Fruits White Rice / 1 kg",
      image: "src/assets/wp9212100-agriculture-4k-wallpapers.jpg",
      status: "On Hold",
    },
    {
      name: "Product 2",
      price: 29.99,
      detail: "Kannadiyar Fruits White Rice / 1 kg",
      image: "src/assets/wp9212100-agriculture-4k-wallpapers.jpg",
      status: "Delivered",
    },
    // Add more items as needed
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="p-4">Image</th>
              <th className="p-4">Details</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item, index) => (
              <WishlistItem key={index} {...item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WishlistItems;