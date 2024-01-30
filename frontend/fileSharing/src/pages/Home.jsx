import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  // const [response, setResponse] = useState();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      // Replace 'http://localhost:3000/upload' with your actual server endpoint
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle the response as needed
      console.log("Upload successful:", response.data);
      setLink(response.data.fileLink);
    } catch (error) {
      // Handle errors
      console.error("Error uploading file:", error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="text-xl h-screen bg-blue-400 flex justify-center items-center ">
        <div className="card w-96 bg-blue-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">
              File Share App
            </h2>

            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
              className="file-input w-full max-w-xs "
            />
            <input
              name="password"
              type="text"
              onChange={handlePasswordChange}
              placeholder="Password"
              className="input input-bordered input-info w-full max-w-xs"
            />

            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-secondary">
                Share
              </button>
            </div>
          </div>
          {link ? (
            <div className="mockup-code">
              <pre>
                {/* TODO :  Add a copying functionality */}
                <code className="text-xs text-warning underline">{link}</code>
              </pre>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default Home;
