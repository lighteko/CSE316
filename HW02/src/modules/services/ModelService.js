import { Comment, Community, LinkFlair, Post } from "./dataclass";
import { SortType } from "../types";

class ModelService {
  constructor(model) {
    this.model = model;
  }

  getNewPostID() {
    return "p" + (this.model.data.posts.length + 1);
  }

  getNewCommentID() {
    return "comment" + (this.model.data.comments.length + 1);
  }

  getNewCommunityID() {
    return "community" + (this.model.data.communities.length + 1);
  }

  getNewLinkFlairID() {
    return "lf" + (this.model.data.linkFlairs.length + 1);
  }

  getAllPosts() {
    const response = [];
    this.model.data.posts.forEach((post) => {
      response.push(this.getPostByID(post.postID));
    });
    return response;
  }

  getPostByID(postID) {
    const post = this.model.data.posts.find((post) => post.postID === postID);
    const comments = post.commentIDs.map((commentID) =>
      this.getCommentByID(commentID)
    );
    const linkFlair = this.getLinkFlairByID(post.linkFlairID);
    return new Post({ ...post, linkFlair, comments });
  }

  getPostsByQuery(query) {
    const filter = query.toLowerCase();
    const response = [];
    const posts = this.getAllPosts();
    posts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(filter) ||
        post.content.toLowerCase().includes(filter)
      ) {
        response.push(post);
      } else {
        const recursiveSearch = (comment) => {
          if (comment.content.toLowerCase().includes(filter)) {
            response.push(post);
          } else if (comment.replies.length > 0) {
            comment.replies.forEach((reply) => {
              recursiveSearch(reply);
            });
          }
        };
        post.comments.forEach((comment) => {
          recursiveSearch(comment);
        });
      }
    });
    return response;
  }

  getSortedPosts(posts, type) {
    const response = [...posts];
    switch (type) {
      case SortType.NEWEST:
        response.sort((a, b) => b.postedDate - a.postedDate);
        break;
      case SortType.OLDEST:
        response.sort((a, b) => a.postedDate - b.postedDate);
        break;
      case SortType.ACTIVE:
        response.sort((a, b) => {
          if (a.comments.length === 0 && b.comments.length === 0) {
            return b.postedDate - a.postedDate;
          } else if (a.comments.length === 0) {
            return -1;
          } else if (b.comments.length === 0) {
            return 1;
          } else {
            let mostRecentA, mostRecentB;
            a.comments.forEach((comment) => {
              mostRecentA = this.getMostRecentCommentByID(comment.commentID);
            });
            b.comments.forEach((comment) => {
              mostRecentB = this.getMostRecentCommentByID(comment.commentID);
            });
            if (mostRecentA.commentedDate === mostRecentB.commentedDate) {
              return b.postedDate - a.postedDate;
            } else {
              return mostRecentB.commentedDate - mostRecentA.commentedDate;
            }
          }
        });
        break;
      default:
        throw new Error("Invalid sort type");
    }
    return response;
  }

  getAllCommunities() {
    const response = [];
    this.model.data.communities.forEach((community) => {
      response.push(this.getCommunityByID(community.communityID));
    });
    return response;
  }

  getCommunityByID(communityID) {
    const community = this.model.data.communities.find(
      (community) => community.communityID === communityID
    );
    const posts = [];
    community.postIDs.forEach((postID) => {
      posts.push(this.getPostByID(postID));
    });
    return new Community({ ...community, posts });
  }

  getCommunityByPostID(postID) {
    let response;
    this.getAllCommunities().forEach((community) => {
      if (community.posts.find((post) => post.postID === postID)) {
        response = community;
      }
    });
    return response;
  }

  getCommentByID(commentID) {
    const comment = this.model.data.comments.find(
      (comment) => comment.commentID === commentID
    );
    const replies = [];
    comment.commentIDs.forEach((commentID) => {
      replies.push(this.getCommentByID(commentID));
    });
    return new Comment({ ...comment, replies });
  }

  getNumberOfCommentsByPostID(postID) {
    const post = this.getPostByID(postID);
    let count = post.comments.length;
    const recursiveCount = (comment) => {
      count += comment.replies.length;
      comment.replies.forEach((reply) => {
        recursiveCount(reply);
      });
    };
    post.comments.forEach((comment) => {
      recursiveCount(comment);
    });
    return count;
  }

  getMostRecentCommentByID(commentID) {
    const comment = this.getCommentByID(commentID);
    let mostRecent = comment;
    const recursiveSearch = (comment) => {
      if (comment.commentedDate > mostRecent.commentedDate) {
        mostRecent = comment;
      }
      comment.replies.forEach((reply) => {
        recursiveSearch(reply);
      });
    };
    comment.replies.forEach((reply) => {
      recursiveSearch(reply);
    });
    return mostRecent;
  }

  getSortedComments(comments, type) {
    const response = [...comments];
    switch (type) {
      case SortType.NEWEST:
        response.sort((a, b) => b.commentedDate - a.commentedDate);
        break;
      case SortType.OLDEST:
        response.sort((a, b) => a.commentedDate - b.commentedDate);
        break;
      case SortType.ACTIVE:
        break;
      default:
        throw new Error("Invalid sort type");
    }
    return response;
  }

  getAllLinkFlairs() {
    const response = [];
    this.model.data.linkFlairs.forEach((linkFlair) => {
      response.push(this.getLinkFlairByID(linkFlair.linkFlairID));
    });
    return response;
  }

  getLinkFlairByID(linkFlairID) {
    const linkFlair = this.model.data.linkFlairs.find(
      (linkFlair) => linkFlair.linkFlairID === linkFlairID
    );
    return new LinkFlair({ ...linkFlair });
  }

  addPost(post, community) {
    const postData = {
      postID: post.postID,
      title: post.title,
      content: post.content,
      postedBy: post.postedBy,
      postedDate: post.postedDate,
      linkFlairID: post.linkFlair.linkFlairID,
      commentIDs: post.comments.map((comment) => comment.commentID),
      views: post.views,
    };
    this.model.data.posts.push(postData);
    this.model.data.communities
      .find((c) => c.communityID === community.communityID)
      .postIDs.push(post.postID);
  }

  addComment(comment, post) {
    const commentData = {
      commentID: comment.commentID,
      content: comment.content,
      commentedBy: comment.commentedBy,
      commentedDate: comment.commentedDate,
      commentIDs: comment.replies.map((reply) => reply.commentID),
    };
    this.model.data.comments.push(commentData);
    this.model.data.posts
      .find((p) => p.postID === post.postID)
      .commentIDs.push(comment.commentID);
  }

  addReply(reply, comment) {
    const replyData = {
      commentID: reply.commentID,
      content: reply.content,
      commentedBy: reply.commentedBy,
      commentedDate: reply.commentedDate,
      commentIDs: reply.replies.map((reply) => reply.commentID),
    };
    this.model.data.comments.push(replyData);
    this.model.data.comments
      .find((c) => c.commentID === comment.commentID)
      .commentIDs.push(reply.commentID);
  }

  addCommunity(community) {
    this.model.data.communities.push({
      communityID: community.communityID,
      name: community.name,
      description: community.description,
      startDate: community.startDate,
      members: community.members,
      postIDs: community.posts.map((post) => post.postID),
      memberCount: community.members.length,
    });
  }

  addLinkFlair(linkFlair) {
    this.model.data.linkFlairs.push({ ...linkFlair });
  }
}

export default ModelService;
