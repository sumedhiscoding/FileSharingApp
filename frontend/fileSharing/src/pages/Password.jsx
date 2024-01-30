import React,{useState} from "react";
import { useParams } from "react-router-dom";
const Password = () => {
  const { id } = useParams();
  const [pass,setPass]=useState("");
  const handleSubmit=async(event)=>{
    console.log(pass);
    try
    {  const response = await axios({
      method: "get",
      url: `http://localhost:3000/file/${id}`,
      responseType: "blob", // Important for binary data
    });

    // Handle the response
  } catch (error) {
    console.error("Error downloading file:", error);
  }
  }
  const handleOnChange=(event)=>{
    setPass(event.target.value);
  }
  
  return (
    <div>
      <h2>{id}</h2>
      <form className="">
      <div className="text-xl h-screen bg-blue-400 flex justify-center items-center ">
        <div className="card w-96 bg-blue-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">
              File Share App
            </h2>
            
            <input
              name="password"
              type="text"
              placeholder="Password"
              onChange={handleOnChange}
              className="input input-bordered input-info w-full max-w-xs"
            />

            <div className="card-actions justify-end">
              <button type="button" onClick={handleSubmit} className="btn btn-secondary">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Password;
