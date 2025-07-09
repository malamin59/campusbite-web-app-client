import axios from "axios";

//Upload image

    export const imageUpload = async (ImageData) => {
    const imageFromData = new FormData();
    imageFromData.append("image", ImageData);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_URL}`,
        imageFromData
    );
    return data.data.display_url;
    };
