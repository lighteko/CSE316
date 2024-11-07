import axios from "axios";

class CommunityAPI {
  static async createCommunity(communityData) {
    try {
      const response = await axios.post("http://localhost:8000/communities", communityData);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllCommunities() {
    try {
      const response = await axios.get("http://localhost:8000/communities");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCommunityById(communityId) {
    try {
      const response = await axios.get(`http://localhost:8000/communities/${communityId}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCommunityOfPost(postId) {
    try {
      const response = await axios.get(`http://localhost:8000/communities/post/${postId}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updateCommunity(communityId, communityData) {
    try {
      const response = await axios.put(
        `http://localhost:8000/communities/${communityId}`,
        communityData
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default CommunityAPI;
