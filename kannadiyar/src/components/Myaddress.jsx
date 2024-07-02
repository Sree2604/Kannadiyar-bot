import React, { useEffect, useState, useCallback } from "react";
import Addressmodel from "./Addressmodel";
import EditAddressmodel from "./EditAddressModal";

function MyAddress({ deliveryAddress, onAddressSelect }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const custId = sessionStorage.getItem("custId");
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAddressesFromServer = async () => {
      try {
        const addressesFromServer = await fetchAddresses(custId);
        setAddresses(addressesFromServer);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddressesFromServer();
  }, [custId]);

  const fetchAddresses = async (custId) => {
    const res = await fetch(`${baseurl}getAddress/?custId=${custId}`);
    if (!res.ok) throw new Error("Failed to fetch addresses");
    const data = await res.json();
    return data;
  };

  const updateAddress = async (address, id) => {
    try {
      const res = await fetch(`${baseurl}editAddress/?addressId=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      if (!res.ok) throw new Error("Failed to update address");
      const result = await res.json();
      setAddresses(addresses.map((addr) => (addr.id === id ? result : addr)));
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseurl}delAddress/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete address");
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const addAddress = async (address) => {
    try {
      const res = await fetch(`${baseurl}addAddress/?custId=${custId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      if (!res.ok) throw new Error("Failed to add address");
      const result = await res.json();
      setAddresses([...addresses, result]);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleAddressSelection = useCallback(
    (id) => {
      setSelectedAddress(id);
      sessionStorage.setItem("addressId", id);
      onAddressSelect(id);
    },
    [onAddressSelect]
  );

  const AddressCard = ({
    id,
    name,
    phone,
    location,
    onEdit,
    onDelete,
    onSelect,
    isSelected,
  }) => {
    return (
      <div className="border rounded-lg p-2 mb-3 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{name}</h1>
          <input
            className="h-5 w-5"
            type="radio"
            value={id}
            onChange={() => onSelect(id)}
            checked={isSelected}
          />
        </div>
        <div className="flex items-center mt-2">
          <ion-icon name="call-outline" className="text-2xl"></ion-icon>
          <span>{phone}</span>
        </div>
        <div className="flex items-center mt-2">
          <ion-icon name="location-outline" className="text-2xl"></ion-icon>
          <span>{location}</span>
        </div>
        <div className="flex justify-end mt-4">
          <EditAddressmodel addressDetail={updateAddress} oldAddress={onEdit} />
          <button className=" text-red-500" onClick={() => onDelete(id)}>
            <ion-icon name="trash-outline" className="text-2xl"></ion-icon>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {addresses.length === 0 ? (
        <div>No address available</div>
      ) : (
        <>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              id={address.id}
              name={address.name}
              phone={address.phone}
              location={address.state}
              onEdit={address}
              onDelete={handleDelete}
              onSelect={handleAddressSelection}
              isSelected={selectedAddress === address.id}
            />
          ))}
        </>
      )}
      <Addressmodel addressDetail={addAddress} />
    </div>
  );
}

export default MyAddress;
