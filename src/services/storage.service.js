import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_API_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_API_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file){
    const response=await imagekit.upload({
        file:file,
        filename:filename
    })

    return response;
}

export default uploadImage;