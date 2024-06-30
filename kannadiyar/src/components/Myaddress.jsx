import React, { useEffect, useState } from "react";
import Addressmodel from "./Addressmodel";
import EditAddressmodel from "./EditAddressModal";

// Reusable AddressCard componentx

function MyAddress({ deliveryAddress, onAddressSelect }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const custId = sessionStorage.getItem("custId");
  useEffect(() => {
    const fetchAddressesFromServer = async () => {
      const addressesFromServer = await fetchAddresses();
      setAddresses(addressesFromServer);
    };
    fetchAddressesFromServer();
    console.log(deliveryAddress);
  }, []);
  const baseurl = import.meta.env.VITE_API_URL;

  const fetchAddresses = async () => {
    const res = await fetch(`${baseurl}getAddress/?custId=${custId}`);
    const data = await res.json();
    return data;
  };

  const updateAddress = async (address, id) => {
    // const id = address.id;
    // console.log(id)
    const res = await fetch(`${baseurl}editAddress/?addressId=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const result = await res.json();
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, result } : address
      )
    );
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${baseurl}delAddress/${id}`, {
      method: "DELETE",
    });
    setAddresses(addresses.filter((val) => val.id !== id, console.log(id)));
  };

  const addAddress = async (address) => {
    const res = await fetch(`${baseurl}addAddress/?custId=${custId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const result = await res.json();
    setSelectedAddress([...addresses, result]);
  };

  const handleAddressSelection = (id) => {
    setSelectedAddress(id);
    sessionStorage.setItem("addressId", selectedAddress);
    onAddressSelect(id);
  };

  const AddressCard = ({
    id,
    name,
    phone,
    location,
    onEdit,
    onDelete,
    onSelect,
    state,
  }) => {
    const handleSelectAddress = () => {
      onSelect(id); // Call the onSelect function with the selected address ID
    };
    return (
      <div className="sm: border-1 sm: border-black sm: mt-3 sm: w-60 sm: p-4 md:flex md:flex-col lg:border-1 md:border-black md:mt-4 rounded-lg lg:border-2 lg:border-black lg:mt-5 lg:p-4 lg:w-3/4">
        <div className="flex flex-row">
          <h1 className="text-xl font-semibold mr-16">{name}</h1>
          <div>
            <input
              className="h-[30px] w-[30px]"
              type="radio"
              value={id}
              onChange={handleSelectAddress}
              checked={state}
            />
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="text-3xl mr-2">
            <ion-icon name="call-outline"></ion-icon>
          </div>
          <div>
            <h1>{phone}</h1>
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="text-3xl mr-2">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div>
            <h1>{location}</h1>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="cursor-pointer lg:text-2xl">
            <EditAddressmodel
              addressDetail={updateAddress}
              oldAddress={onEdit}
            />
          </div>
          <div className="cursor-pointer ml-4" onClick={onDelete}>
            <ion-icon
              name="trash-outline"
              class="text-red-500 lg:text-2xl"
            ></ion-icon>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {!addresses ? (
        <Addressmodel addressDetail={addAddress} />
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
              onSelect={(id) => handleAddressSelection(id)}
              onDelete={() => handleDelete(address.id)}
              state={selectedAddress === address.id}
            />
          ))}
        </>
      )}
      <Addressmodel addressDetail={addAddress} />
    </div>
  );
}

export default MyAddress;
