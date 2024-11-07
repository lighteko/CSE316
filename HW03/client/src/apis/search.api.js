import axios from "axios";

class SearchAPI {
  static async searchPosts(searchQuery, sortType) {
    try {
      const response = await axios.get(`http://localhost:8000/search/posts/${searchQuery}/${sortType}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default SearchAPI;
