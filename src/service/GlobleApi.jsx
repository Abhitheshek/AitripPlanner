import axios from "axios";

const PIXABAY_API_URL = "https://pixabay.com/api/";
const PIXABAY_API_KEY = "48358723-a387bf81accfe8d8303887a62"; // Replace with your key

export const getPixabayImage = async (query) => {
    try {
        const response = await axios.get(PIXABAY_API_URL, {
            params: { key: PIXABAY_API_KEY, q: query, image_type: "photo" },
        });
        return response.data.hits[0]?.webformatURL; // URL of the first image
    } catch (error) {
        console.error("Error fetching image from Pixabay:", error);
        throw error;
    }
};
