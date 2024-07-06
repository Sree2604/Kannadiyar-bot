import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function Drop({ weight, selectedItem, setSelectedItem }) {
  const [localSelectedItem, setLocalSelectedItem] = useState("Select");

  useEffect(() => {
    if (selectedItem) {
      setLocalSelectedItem(selectedItem);
    }
  }, [selectedItem]);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey); // Update the selected item in parent
    setLocalSelectedItem(eventKey); // Update the local state
  };

  return (
    <div className="ml-none">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="border-gray-3 font-medium relative ml-0 bg-transparent text-black text-sm text-left rounded-none hover:bg-lime-500"
        >
          {localSelectedItem}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {weight.map((item, index) => (
            <Dropdown.Item
              eventKey={item} // Set the eventKey to the item value
              key={index}
              className="hover:bg-green-500 rounded-md"
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Drop;
