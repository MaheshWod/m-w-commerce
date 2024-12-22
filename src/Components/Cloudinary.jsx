
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Cloudinary = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Load the image URL from localStorage when the component mounts
//   useEffect(() => {
//     const savedImageUrl = localStorage.getItem('uploadedImage');
//     if (savedImageUrl) {
//       setImageUrl(savedImageUrl);
//     }
//   }, []);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);

//     // Create FormData object to send file and upload preset
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'Upload-Image'); // Replace with your Cloudinary upload preset

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/dweafkk48/image/upload`,
//         formData
//       );

//       const url = response.data.secure_url;
//       setImageUrl(url);

//       // Save the image URL in localStorage
//       localStorage.setItem('uploadedImage', url);

//       alert('Image uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading the image', error);
//       alert('Failed to upload image');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Image to Cloudinary</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         disabled={loading}
//         className="file-input"
//       />
//       {loading && <p>Uploading...</p>}
//       {imageUrl && (
//         <div>
//           <p>Uploaded Image:</p>
//           <img src={imageUrl} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cloudinary;


