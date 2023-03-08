import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemEnteredByUser: '',
    itemEnteredDate: '',
    itemBuyingPrice: '',
    itemSellingPrice: '',
    itemLastModifiedDate: '',
    itemLastModifiedByUser: '',
    itemStatus: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8080/app/item', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => alert("Item added successfully"))
      .catch(error => console.error(error));
  };

  return (
    <div>
    <ToastContainer />
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Entered By User:
        <input type="text" name="itemEnteredByUser" value={formData.itemEnteredByUser} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Entered Date:
        <input type="datetime-local" name="itemEnteredDate" value={formData.itemEnteredDate} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Buying Price:
        <input type="number" name="itemBuyingPrice" value={formData.itemBuyingPrice} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Selling Price:
        <input type="number" name="itemSellingPrice" value={formData.itemSellingPrice} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Last Modified Date:
        <input type="datetime-local" name="itemLastModifiedDate" value={formData.itemLastModifiedDate} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Last Modified By User:
        <input type="text" name="itemLastModifiedByUser" value={formData.itemLastModifiedByUser} onChange={handleChange} />
      </label>
      <br />
      <label>
      Item Status:
      <select name="itemStatus" value={formData.itemStatus} onChange={handleChange}>
      <option value="">--Please choose an option--</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="SOLD">SOLD</option>
      </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default MyForm;
