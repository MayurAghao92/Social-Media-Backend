import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_API_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_API_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file,filename){
     try {
    const response = await imagekit.upload({
      file: file,         
      fileName: filename,
      folder: "Social-Media",
    });

    return response;
  } catch (err) {
    console.error(" ImageKit upload failed:", err.message);
  }
}

export default uploadFile;