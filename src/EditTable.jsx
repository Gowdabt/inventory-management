import React, { useState, useEffect } from 'react';


const appUrl= "http://localhost:8080/app/item";
function EditTable() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [newRowData, setNewRowData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(appUrl);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = async (index,row) => {
    try {
      await fetch(`http://localhost:8080/app/item/${row.itemId}`, { method: 'DELETE' });
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (index,row) => {
    try {
      const response = await fetch(`http://localhost:8080/app/item/${row.itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRowData),
      });
      const json = await response.json();
      const newData = [...data];
      newData[index] = json;
      setData(newData);
      setEditIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr style={{borderBottom: 'solid 3px red',background: 'aliceblue',color: 'black',fontWeight: 'bold',}}>
            <th>ID</th>
          <th>Item Name</th>
          {/* <th>Item Entered By User</th>
          <th>Item Entered Date</th> */}
          <th>Item Buying Price</th>
          <th>Item Selling Price</th>
          {/* <th>Item Last Modified Date</th>
          <th>Item Last Modified By User</th> */}
          <th>Item Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.itemId} style={{padding: '10px',border: 'solid 1px gray',background: 'papayawhip',}}>
            <td>{row.itemId}</td>
            <td>{editIndex === index ? (<input type="text" name="itemName" value={newRowData.itemName || row.itemName} onChange={handleInputChange}/>) : (row.itemName)}</td>
            <td>{editIndex === index ? (<input type="number" name="itemBuyingPrice" value={newRowData.itemBuyingPrice || row.itemBuyingPrice} onChange={handleInputChange}/>) : (row.itemBuyingPrice)}</td>
            <td>{editIndex === index ? (<input type="number" name="itemSellingPrice" value={newRowData.itemSellingPrice || row.itemSellingPrice} onChange={handleInputChange}/>) : (row.itemSellingPrice)}</td>
            

            <td>{editIndex === index ? (<select name="itemStatus" value={newRowData.itemStatus || row.itemStatus} onChange={handleInputChange}>
                <option value="">--Please choose an option--</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="SOLD">SOLD</option>
                </select>) : (row.itemStatus)}
            </td>

            <td>
              {editIndex === index ? (
                <>
                  <button onClick={() => handleSave(index,row)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(index,row)}>Edit</button>
                  <button onClick={() => handleDelete(index,row)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditTable;
