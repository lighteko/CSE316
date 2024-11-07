class Post {
  constructor({
    postID,
    title,
    content,
    postedBy,
    postedDate,
    linkFlair,
    comments,
    views,
  }) {
    this.postID = postID;
    this.title = title;
    this.content = content;
    this.postedBy = postedBy;
    this.postedDate = postedDate;
    this.linkFlair = linkFlair;
    this.comments = comments;
    this.views = views;
  }
}

class Community {
  constructor({
    communityID,
    name,
    description,
    posts,
    startDate,
    members,
    memberCount,
  }) {
    this.communityID = communityID;
    this.name = name;
    this.description = description;
    this.posts = posts;
    this.startDate = startDate;
    this.members = members;
    this.memberCount = memberCount;
  }
}

class Comment {
  constructor({ commentID, content, commentedBy, replies, commentedDate }) {
    this.commentID = commentID;
    this.content = content;
    this.commentedBy = commentedBy;
    this.replies = replies;
    this.commentedDate = commentedDate;
  }
}

class LinkFlair {
  constructor({ linkFlairID, content }) {
    this.linkFlairID = linkFlairID;
    this.content = content;
  }
}

export { Post, Community, Comment, LinkFlair };
