import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Table from "./Table";
// import {toast, ToastContainer} from 'react-toast'

function App() {

  //  Add user ....................................................................

  const [showAdd, setShowAdd] = useState(false);
  const [items, setItems] = useState({
    name: "",
    fathername: "",
    email: "",
    phone: "",
  });

  const handleOnchange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/user-create",items);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleForm = () => {
    setShowAdd(!showAdd);
  };

  // Get user ...............................................................

  


  return (
    <>

    {/* Add User Button ......................................................................... */}
      <div className="h-20 w-full bg-red-400 relative">
        {!showAdd && (
          <button
            className="absolute right-1 bg-neutral-50 p-2 mt-4 text-xl"
            onClick={toggleForm}
          >
            Add User
          </button>
        )}
      </div>

      {/* Add user Form ......................................................................... */}

      {showAdd && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="container mx-auto bg-gray-400 w-[400px] rounded-lg shadow-lg p-8">
            <form className="max-w-md mx-auto relative" onSubmit={handleSubmit}>
              <h3
                className="absolute right-0 bg-slate-50 px-2 cursor-pointer"
                onClick={toggleForm}
              >
                x
              </h3>
              <div className="mb-2 mx-10">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleOnchange}
                  value={items.name}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-2 mx-10">
                <label htmlFor="fathername" className="block text-gray-700">
                  Father's Name
                </label>
                <input
                  type="text"
                  id="fathername"
                  name="fathername"
                  onChange={handleOnchange}
                  value={items.fathername}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-2 mx-10">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleOnchange}
                  value={items.email}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-2 mx-10">
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={handleOnchange}
                  value={items.phone}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="text-center ">
                <button
                  type="submit"
                  className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     <Table/>
    </>
  );
}

export default App;
