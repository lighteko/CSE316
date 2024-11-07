import axios from "axios";

class LinkFlairAPI {
  static async createLinkFlair(linkFlairData) {
    try {
      const response = await axios.post("http://localhost:8000/linkflairs", linkFlairData);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllLinkFlairs() {
    try {
      const response = await axios.get("http://localhost:8000/linkflairs");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getLinkFlairById(linkFlairId) {
    try {
      const response = await axios.get(`http://localhost:8000/linkflairs/${linkFlairId}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default LinkFlairAPI;
