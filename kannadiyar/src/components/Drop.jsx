import Dropdown from 'react-bootstrap/Dropdown';

function Drop({weight}) {
  return (
    <div className='ml-none'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className=' border-gray-3 font-medium relative ml-0  bg-transparent text-black text-sm text-left rounded-none hover:bg-lime-500'>
        {weight}
      </Dropdown.Toggle>
      {/* <Dropdown.Menu>
        <Dropdown.Item href="#" className=' hover:bg-green-500 rounded-md'>200-gms</Dropdown.Item>
        <Dropdown.Item href="#" className=' hover:bg-green-500 rounded-md'>300-gms</Dropdown.Item>
        <Dropdown.Item href="#" className=' hover:bg-green-500 rounded-md'>400-gms</Dropdown.Item>
      </Dropdown.Menu> */}
    </Dropdown>
    </div>
  );
}

export default Drop;