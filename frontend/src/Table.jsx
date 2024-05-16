import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    fathername: "",
    email: "",
    phone: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get");
      const responseData = response.data.data;
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setData(data.filter((item) => item._id !== id));
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setEditedUserData({
      name: user.name,
      fathername: user.fathername,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveEditedUser = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${editingUser._id}`, editedUserData);
      console.log("response", response);
      fetchData();
      setEditingUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-yellow-200">
                <th className="border border-gray-500 px-4 py-2">S no.</th>
                <th className="border border-gray-500 px-4 py-2">Name</th>
                <th className="border border-gray-500 px-4 py-2">Father's Name</th>
                <th className="border border-gray-500 px-4 py-2">Email</th>
                <th className="border border-gray-500 px-4 py-2">Phone</th>
                <th className="border border-gray-500 px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} className="bg-gray-100">
                  <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.fathername}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.phone}</td>
                  <td className="border border-gray-500 px-4 py-2">
                    <button
                      className="bg-green-500 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {editingUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleEditInputChange}
              placeholder="Name"
              className="block w-full border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              name="fathername"
              value={editedUserData.fathername}
              onChange={handleEditInputChange}
              placeholder="Father's Name"
              className="block w-full border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="email"
              name="email"
              value={editedUserData.email}
              onChange={handleEditInputChange}
              placeholder="Email"
              className="block w-full border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              name="phone"
              value={editedUserData.phone}
              onChange={handleEditInputChange}
              placeholder="Phone"
              className="block w-full border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <button
              onClick={saveEditedUser}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
