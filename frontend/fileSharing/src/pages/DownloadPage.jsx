import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const DownloadPage = () => {
  const Navigate = useNavigate();
  const handlePasswordDownloadFile = (response) => {
    console.log("handlePasswordDownloadFile", response.data.fileLink);
    window.location.replace(response.data.fileLink);
  };

  const passwordDownloadFile = async () => {
    try {
      const passwordpagelink = await axios({
        method: "get",
        url: `http://localhost:3000/file/${id}`,
      });
      handlePasswordDownloadFile(passwordpagelink);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFileDownload = (response) => {
    try {
      // Extract filename from Content-Disposition header
      const contentDispositionHeader = response.headers["content-disposition"];
      console.log("headers", response.headers);
      if (contentDispositionHeader) {
        const fileNameMatch =
          contentDispositionHeader.match(/filename="([^"]+)"/i);
        const fileName = fileNameMatch ? fileNameMatch[1] : "downloadedFile";

        // Use FileSaver to save the file
        saveAs(new Blob([response.data]), fileName);
      } else {
        console.error(
          "Content-Disposition header not found in the server response."
        );
        passwordDownloadFile();
      }
    } catch (error) {
      console.error("Error handling file download:", error);
    }
  };

  const { id } = useParams();
  useEffect(() => {
    const downloadFile = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:3000/file/${id}`,
          responseType: "blob", // Important for binary data
        });

        // Handle the response
        handleFileDownload(response);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };

    downloadFile();
  }, []);

  return (
    <div>
      <h2>{id}</h2>
      {}
    </div>
  );
};

export default DownloadPage;
