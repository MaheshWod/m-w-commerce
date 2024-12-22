// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

// const storage = getStorage()

// const uploadFile = async (file, path)=>{
//     const bucket = ref(storage, path)
//     const snapshot = await uploadBytes(bucket, file)
//     const url = await getDownloadURL(snapshot.ref)
//     return url
// }

// export default uploadFile

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const uploadFile = async (file, path) => {
    if (!path) {
        throw new Error("Path is required for file upload");
    }
    const bucket = ref(storage, path);
    const snapshot = await uploadBytes(bucket, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
};

export default uploadFile;

// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const storage = getStorage();

// const uploadFile = async (file, path) => {
//     if (!path) {
//         throw new Error("Path is required for file upload");
//     }
    
//     // Create a reference to the file's location in the storage
//     const bucketRef = ref(storage, path);

//     try {
//         // Upload the file to the specified path
//         const snapshot = await uploadBytes(bucketRef, file);

//         // Get the download URL of the uploaded file
//         const url = await getDownloadURL(snapshot.ref);
//         return url;
//     } catch (error) {
//         // Handle errors related to file upload
//         console.error("File upload failed:", error);
//         throw error; // Re-throw the error to handle it further up the chain
//     }
// };

// export default uploadFile;

