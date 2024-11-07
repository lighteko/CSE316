const PostDAO = require("../daos/post.dao");
const CommunityService = require("./community.service");
const CommentService = require("./comment.service");
const SortType = require("../types/types");

class PostService {
  async createPost(postData) {
    const communityId = postData.communityId;
    delete postData.communityId;
    const post = await PostDAO.createPost(postData);
    const community = await CommunityService.getCommunityById(communityId);
    await CommunityService.updateCommunity(communityId, {
      postIDs: [...community.postIDs, post._id],
    });
    return post;
  }

  async getAllPosts(sortType) {
    const posts = await PostDAO.getAllPosts();
    return this.sortPosts(posts, sortType);
  }

  async getPostsByQuery(query) {
    const posts = await PostDAO.getPostsByQuery(query);
    return posts;
  }

  async getPostsOfCommunity(communityId, sortType) {
    const community = await CommunityService.getCommunityById(communityId);
    const posts = [];
    for (let postId of community.postIDs) {
      posts.push(await PostDAO.getPostById(postId));
    }
    return this.sortPosts(posts, sortType);
  }

  async getPostByCommentId(commentId) {
    const posts = await PostDAO.getAllPosts();
    const post = posts.forEach(async (post) => {
      if (post.commentIDs.includes(commentId)) {
        return post;
      }
    });
    return post;
  }

  async getPostById(postId) {
    return PostDAO.getPostById(postId);
  }

  async updatePost(postId, post) {
    return PostDAO.updatePost(postId, post);
  }

  async sortPosts(posts, sortType) {
    switch (sortType) {
      case SortType.NEWEST:
        posts.sort((a, b) => b.postedDate - a.postedDate);
        break;
      case SortType.OLDEST:
        posts.sort((a, b) => a.postedDate - b.postedDate);
        break;
      case SortType.ACTIVE:
        for (let post of posts) {
          const comments = await CommentService.getAllCommentsOfPost(post._id);
          if (comments.length === 0) {
            post.mostRecentCommentDate = post.postedDate;
          } else {
            let mostRecentCommentDate = comments[0].commentedDate;
            for (let comment of comments) {
              if (comment.commentedDate > mostRecentCommentDate) {
                mostRecentCommentDate = comment.commentedDate;
              }
            }
            post.mostRecentCommentDate = mostRecentCommentDate;
          }
        }

        posts.sort((a, b) => {
          if (a.mostRecentCommentDate === b.mostRecentCommentDate) {
            return b.postedDate - a.postedDate;
          } else {
            return b.mostRecentCommentDate - a.mostRecentCommentDate;
          }
        });
        break;
      default:
        throw new Error("Invalid sort type");
    }
    return posts;
  }

  async increaseViewCount(postId) {
    const post = await PostDAO.getPostById(postId);
    post.views++;
    return PostDAO.updatePost(postId, post);
  }
}

module.exports = new PostService();
