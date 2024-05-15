import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [data, setData] = useState([]);

//  User Data Get ............................................................................
 
    const fetchData = async() => {
      try {
        const response = await axios.get("http://localhost:8000/api/get");
        const responseData = response.data.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


  useEffect(()=> {
    fetchData();
  })

  console.log("data................", data);
// User Data delete .........................................................................

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setData(data.filter(item => item._id !== id));
      console.log("response", response);
    }catch(error){
      console.log("error", error)
    }
  }

  useEffect(() => {
    deleteUser()
  },[])

  



  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">User Information</h1>
    {data.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"onClick={() => deleteUser(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}

export default Table;
