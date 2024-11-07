import Model from "./model.js";

window.onload = function () {
  // fill me with relevant code
  document.getElementById("header-logo").onclick = () =>
    window.location.reload();

  const model = new Model();
  const communityBtn = document.getElementsByClassName("crea-comm")[0];
  communityBtn.onclick = () => {
    removePage();
    renderCreateCommunityPage(model);
  };
  const createPostBtn = document.getElementsByClassName("create-post")[0];
  createPostBtn.onclick = () => {
    removePage();
    renderCreatePostPage(model);
  };
  refreshNavBar(model);

  renderHomePage(model);

  const searchBox = document.getElementsByClassName("search-box")[0];
  searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      removePage();
      renderSearchPage(model, searchBox.value);
    }
  });
};

function refreshNavBar(model) {
  const commList = document.getElementById("comm-list");
  while (commList.firstChild) {
    commList.removeChild(commList.firstChild);
  }
  const communities = getCommunities(model);
  communities.forEach((community) => {
    const node = document.createElement("li");
    node.innerText = community.name;
    node.className = "community";
    node.onclick = () => {
      removePage();
      renderCommunityPage(model, community.communityID);
    };
    commList.appendChild(node);
  });
}

const SORT_BUTTONS = `
<section id="sort-buttons-container">
  <button class="sort buttons" id="newest">Newest</button>
  <button class="sort buttons" id="oldest">Oldest</button>
  <button class="sort buttons" id="active">Active</button>
</section>`;

function removePage() {
  const root = document.getElementById("main");
  root.removeChild(root.lastChild);
}

function refreshPostList(model, postList, sortType, communityID = null) {
  removePostCards(postList);
  addPostsToList(
    model,
    sortPosts(sortType, model, communityID),
    postList,
    communityID === null
  );
}

function addPostsToList(model, posts, postList, showCommunity = true) {
  posts.forEach((post) => {
    postList.appendChild(
      createPostCard(
        model,
        getCommunityByPostID(model, post.postID),
        post,
        getLinkFlairByPostID(model, post.postID),
        showCommunity
      )
    );
  });
}

function createPostCard(model, community, post, linkFlair, showCommunity) {
  const username = post.postedBy;
  const timestamp = toRelativeTime(post.postedDate);
  const title = post.title;
  const contentPreview = post.content.slice(0, 20);
  const views = post.views;
  const commentCount = getAllCommentsByPostID(model, post.postID).length;
  const card = document.createElement("li");
  const communityTitle = showCommunity
    ? `<span id="community">${community.name}</span><span> • </span>`
    : "";
  card.className = "card";
  card.innerHTML = `
  <div id="card-header">
    <div id="post-card-profile">
      ${communityTitle}
      <span id="username">${username}</span>
    </div>
    <span id="at" time="${post.postedDate}">${timestamp}</span>
  </div>
  <p id="card-title">${title}</p>
  <span id="linkflair">${linkFlair === null ? "" : linkFlair.content}</span>
  <br>
  <span id="card-content">${contentPreview}...</span>
  <div id="card-footer"> 
    <div id ="card-stats">
      <span id="views">${views} views</span>
      <span>•</span>
      <span id="num-cmts">${commentCount} comments</span>
    </div>
  </div>`;
  card.onclick = () => {
    removePage();
    renderPostPage(model, post.postID);
  };
  return card;
}

function removePostCards(postList) {
  while (postList.firstChild) {
    postList.removeChild(postList.firstChild);
  }
}

function sortPosts(
  sortType,
  model,
  communityID = null,
  posts = getPosts(model, communityID)
) {
  if (posts.length <= 1) return posts;
  switch (sortType) {
    case "newest":
      posts.sort((a, b) => b.postedDate - a.postedDate);
      break;
    case "oldest":
      posts.sort((a, b) => a.postedDate - b.postedDate);
      break;
    case "active":
      posts.sort((a, b) => {
        const aCmts = getAllCommentsByPostID(model, a.postID);
        const bCmts = getAllCommentsByPostID(model, b.postID);
        if (aCmts.length === 0 && bCmts.length === 0) return 0;
        if (aCmts.length === 0) return 1;
        if (bCmts.length === 0) return -1;
        let maxA = aCmts[0].commentedDate;
        let maxB = bCmts[0].commentedDate;
        for (let cmt of aCmts) {
          if (cmt.commentedDate > maxA) maxA = cmt.commentedDate;
        }
        for (let cmt of bCmts) {
          if (cmt.commentedDate > maxB) maxB = cmt.commentedDate;
        }
        return maxB - maxA;
      });
      break;
  }
  return posts;
}

function createCommentCard(model, comment, postID) {
  const username = comment.commentedBy;
  const timestamp = toRelativeTime(comment.commentedDate);
  const content = comment.content;
  const commentCard = document.createElement("li");
  commentCard.className = "comment-card";
  commentCard.innerHTML = `
  <div id="cmtcard-profile">
    <span id="cmtcard-username">${username}</span>
    <span> • </span>
    <span class="cmtcard-at" id="at" time="${comment.commentedDate}">${timestamp}</span>
  </div>
  <p class="cmtcard-content" id="comment-content">${content}</p>
  <section id="comment-footer">
    <button class="reply buttons" id="reply-button">Reply</button>
  </section>
  <ul id="replies"></ul>
  `;
  const replyBtn = commentCard.querySelector("#reply-button");
  replyBtn.onclick = () => {
    removePage();
    renderCreateCommentPage(model, comment.commentID, postID, true);
  };

  return commentCard;
}

function sortComments(comments) {
  if (comments.length <= 1) return comments;
  comments.sort((a, b) => b.commentedDate - a.commentedDate);
  return comments;
}

function renderComments(model, commentList, comment, postID) {
  if (comment.commentIDs.length != 0) {
    const card = createCommentCard(model, comment, postID);
    const repliesList = card.querySelector("#replies");
    const replies = getRepliesByCommentID(model, comment.commentID);
    const sortedReplies = sortComments(replies);
    sortedReplies.forEach((reply) => {
      renderComments(model, repliesList, reply, postID);
    });
    commentList.appendChild(card);
  } else {
    commentList.appendChild(createCommentCard(model, comment, postID));
  }
}

// POST PAGE SECTION
function renderPostPage(model, postID) {
  const post = getPostByID(model, postID);
  const community = getCommunityByPostID(model, postID);
  const comments = getCommentsByPostID(model, postID);
  const allComments = getAllCommentsByPostID(model, postID);
  const linkFlair = getLinkFlairByPostID(model, postID);
  const main = document.createElement("main");
  main.id = "post-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header" id="post-header">
    <section id="info">
      ${community.name} • ${toRelativeTime(post.postedDate)}
    </section>
    <section id="post-author">
      <span id="username">${post.postedBy}</span>
    </section>
    <section id="post-title">
      <h5>${post.title}</h5>
    </section>
    <section id="post-linkflair">
      ${linkFlair === null ? "" : linkFlair.content}
    </section>
  </header>
  <section class="content" id="post-body">
    <article id="content">
      ${post.content}
    </article>
    <section id="stats">
      <span id="views">${post.views} Views</span>
      <span>•</span>
      <span id="comments">${allComments.length} Comments</span>
    </section>
    <section id="comment-form">
      <button class="comment buttons" id="comment-button">Add a Comment</button>
    </section>
    <footer class="footer">
      <ul id="comment-list"></ul>
    </footer>
  </section>
  `;
  const commentList = main.querySelector("#comment-list");
  const sortedComments = sortComments(comments);
  sortedComments.forEach((comment) =>
    renderComments(model, commentList, comment, postID)
  );
  const commentBtn = main.querySelector("#comment-button");
  commentBtn.onclick = () => {
    removePage();
    renderCreateCommentPage(model, postID);
  };

  const root = document.getElementById("main");
  root.appendChild(main);
}

// SEARCH PAGE SECTION
function renderSearchPage(model, query) {
  const main = document.createElement("main");
  const posts = getPosts(model);
  const queryWords = query.toLowerCase().split(" ");
  const filteredPosts = [];
  posts.forEach((post) => {
    for (let word of queryWords) {
      const comments = getAllCommentsByPostID(model, post.postID)
        .map((comment) => comment.content)
        .join(" ");
      if (
        post.title.toLowerCase().includes(word) ||
        post.content.toLowerCase().includes(word) ||
        comments.toLowerCase().includes(word)
      ) {
        filteredPosts.push(post);
        break;
      }
    }
  });
  main.id = "search-results-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>${
        filteredPosts.length > 0
          ? "Results for: " + query
          : "No results found for: " + query
      }</h5>
    </section>
    ${SORT_BUTTONS}
  </header>
  <div id="num-posts"></div>
  <section class="content" id="search-results">
    <ul id="posts"></ul>
  </section>
  
  `;

  const postList = main.querySelector("#posts");

  addPostsToList(
    model,
    sortPosts("newest", model, null, filteredPosts),
    postList,
    true
  );
  main.querySelector("#num-posts").innerText = filteredPosts.length + " posts";
  const sortButtons = main.querySelectorAll(".sort");
  sortButtons.forEach((button) => {
    button.onclick = () => refreshPostList(model, postList, button.id);
  });

  if (filteredPosts.length === 0) {
    const noResults = document.createElement("div");
    noResults.id = "no-results";
    noResults.innerText = "Things went wrong";
    const content = main.querySelector(".content");
    content.appendChild(noResults);
  }

  const root = document.getElementById("main");
  root.appendChild(main);
}

// COMMUNITY PAGE SECTION
function renderCommunityPage(model, communityID) {
  const main = document.createElement("main");
  const community = getCommunityByID(model, communityID);
  main.id = "community-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>${community.name}</h5>
      <span id="description">${community.description}</span>
      <span id="timestamp">Created ${toRelativeTime(community.startDate)}</span>
    </section>
    ${SORT_BUTTONS}
  </header>
  <div id="num-posts"></div>
  <section class="content">
    <ul id="posts"></ul>
  </section>
  `;

  const postList = main.querySelector("#posts");
  addPostsToList(
    model,
    sortPosts("newest", model, communityID),
    postList,
    false
  );
  main.querySelector("#num-posts").innerText =
    getPosts(model, communityID).length + " posts";
  const sortButtons = main.querySelectorAll(".sort");
  sortButtons.forEach((button) => {
    button.onclick = () =>
      refreshPostList(model, postList, button.id, communityID);
  });

  const root = document.getElementById("main");
  root.appendChild(main);
}

// HOMEPAGE SECTION
function renderHomePage(model) {
  const main = document.createElement("main");
  main.id = "home-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>All Posts</h5>
    </section>
    ${SORT_BUTTONS}
  </header>
  <div id="num-posts"></div>
  <section class="content">
    <ul id="posts"></ul>
  </section>
  `;

  const postList = main.querySelector("#posts");
  addPostsToList(model, sortPosts("newest", model), postList);
  main.querySelector("#num-posts").innerText =
    getPosts(model).length + " posts";
  const sortButtons = main.querySelectorAll(".sort");
  sortButtons.forEach((button) => {
    button.onclick = () => {
      refreshPostList(model, postList, button.id);
    };
  });

  const root = document.getElementById("main");
  root.appendChild(main);
}

// CREATE COMMUNITY PAGE SECTION
function renderCreateCommunityPage(model) {
  const main = document.createElement("main");
  main.id = "create-community-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>New Community</h5>
    </section>
  </header>
  <section class="content" id="form">
    <input class="form community-creator" type="text" id="creator-name" placeholder="Creator Name *" />
    <input class="form" type="text" id="community-name" placeholder="Community Name *" maxlength=100 />
    <textarea class="form community-descrp" id="community-description" placeholder="Description *" maxlength=500></textarea>
    <button class="submit" id="create-community-button" disabled>Engender Community</button>
  </section>
  `;

  const createBtn = main.querySelector("#create-community-button");
  const communityName = main.querySelector("#community-name");
  const description = main.querySelector("#community-description");
  const username = main.querySelector("#creator-name");
  createAlert(
    communityName,
    "community-name-error",
    "Community name is required"
  );
  createAlert(description, "description-error", "Description is required");
  createAlert(username, "creator-name-error", "Creator name is required");
  communityName.addEventListener("input", () => {
    removeAlert(communityName, "community-name-error");
    if (communityName.value === "") {
      createAlert(
        communityName,
        "community-name-error",
        "Community name is required"
      );
    }
    const errors = document.getElementsByClassName("error");
    createBtn.disabled = !(
      errors.length === 0 &&
      description.value !== "" &&
      communityName.value !== "" &&
      username.value !== ""
    );
  });

  description.addEventListener("input", () => {
    removeAlert(description, "description-error");
    if (description.value === "") {
      createAlert(description, "description-error", "Description is required");
    }
    const errors = document.getElementsByClassName("error");
    createBtn.disabled = !(
      errors.length === 0 &&
      description.value !== "" &&
      communityName.value !== "" &&
      username.value !== ""
    );
  });

  username.addEventListener("input", () => {
    removeAlert(username, "creator-name-error");
    if (username.value === "") {
      createAlert(username, "creator-name-error", "Creator name is required");
    }
    const errors = document.getElementsByClassName("error");
    createBtn.disabled = !(
      errors.length === 0 &&
      description.value !== "" &&
      communityName.value !== "" &&
      username.value !== ""
    );
  });

  createBtn.onclick = () => {
    const community = {
      communityID: "community" + (getCommunities(model).length + 1),
      name: communityName.value,
      description: description.value,
      postIDs: [],
      startDate: new Date(),
      members: [username.value],
      memberCount: 1,
    };
    createCommunity(model, community);
    removePage();
    refreshNavBar(model);
    renderCommunityPage(model, community.communityID);
  };

  const root = document.getElementById("main");
  root.appendChild(main);
}

// CREATE POST PAGE SECTION
function renderCreatePostPage(model) {
  const main = document.createElement("main");
  main.id = "create-post-page";
  main.className = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>New Post</h5>
    </section>
  </header>
  <section class="content" id="form">
    <select class="form dropdown" name="communities">
      <option value="" selected disabled hidden>Select a community *</option>
    </select>
    <input class="form post-author-name"type="text" id="author-name" placeholder="Author Name *" />
    <input class="form post-title" id="form-post-title" type="text" placeholder="Title *" maxlength=100/>
    <textarea class="form post-content"id="post-content" placeholder="Body *"></textarea>
    <select class="form dropdown post-linkflair" name="linkflairs">
      <option value="" selected disabled hidden>Select a linkflair</option>
      <option value="new">Add a new one</option>
    </select>
    <button class="submit" id="create-post-button" disabled>Submit Post</button>
  </section>`;

  const dropdown = main.querySelector(".dropdown");
  const communities = getCommunities(model);
  communities.forEach((community) => {
    const option = document.createElement("option");
    option.value = community.communityID;
    option.innerText = community.name;
    dropdown.appendChild(option);
  });
  const submit = main.querySelector("#create-post-button");

  const linkFlairDropdown = main.querySelector(".post-linkflair");
  const linkFlairs = getLinkFlairs(model);
  linkFlairs.forEach((linkFlair) => {
    const option = document.createElement("option");
    option.value = linkFlair.linkFlairID;
    option.innerText = linkFlair.content;
    linkFlairDropdown.appendChild(option);
  });

  const title = main.querySelector(".post-title");
  const content = main.querySelector("#post-content");
  const author = main.querySelector("#author-name");

  createAlert(dropdown, "community-error", "Community is required");
  createAlert(author, "author-error", "Author name is required");
  createAlert(title, "title-error", "Title is required");
  createAlert(content, "content-error", "Content is required");

  dropdown.addEventListener("input", () => {
    removeAlert(dropdown, "community-error");
    if (dropdown.value === "") {
      createAlert(dropdown, "community-error", "Community is required");
    }
    submit.disabled = !(
      dropdown.value !== "" &&
      author.value !== "" &&
      title.value !== "" &&
      content.value !== ""
    );
  });

  author.addEventListener("input", () => {
    removeAlert(author, "author-error");
    if (author.value === "") {
      createAlert(author, "author-error", "Author name is required");
    }
    submit.disabled = !(
      dropdown.value !== "" &&
      author.value !== "" &&
      title.value !== "" &&
      content.value !== ""
    );
  });

  title.addEventListener("input", () => {
    removeAlert(title, "title-error");
    if (title.value === "") {
      createAlert(title, "title-error", "Title is required");
    }
    submit.disabled = !(
      dropdown.value !== "" &&
      author.value !== "" &&
      title.value !== "" &&
      content.value !== ""
    );
  });

  content.addEventListener("input", () => {
    removeAlert(content, "content-error");
    if (content.value === "") {
      createAlert(content, "content-error", "Content is required");
    }
    submit.disabled = !(
      dropdown.value !== "" &&
      author.value !== "" &&
      title.value !== "" &&
      content.value !== ""
    );
  });

  let linkFlairContent = "";
  let linkFlairID = "";
  linkFlairDropdown.addEventListener("input", () => {
    if (linkFlairDropdown.value === "new") {
      const form = main.querySelector("#form");
      const input = document.createElement("input");
      input.className = "form linkflair-content";
      input.type = "text";
      input.placeholder = "Linkflair";
      input.maxLength = 30;
      if (linkFlairID !== "") linkFlairID = "";
      input.addEventListener("input", () => {
        linkFlairContent = input.value;
      });
      form.insertBefore(input, submit);
    } else {
      const flairContent = main.querySelector(".linkflair-content");
      if (flairContent) {
        flairContent.remove();
      }
      linkFlairID = linkFlairDropdown.value;
      linkFlairContent = "";
    }
  });

  submit.onclick = () => {
    if (linkFlairContent !== "") {
      linkFlairID = "lf" + (getLinkFlairs(model).length + 1);
      createLinkFlair(model, { linkFlairID, content: linkFlairContent });
    }
    const post = {
      postID: "p" + (getPosts(model).length + 1),
      title: title.value,
      content: content.value,
      postedBy: author.value,
      postedDate: new Date(),
      linkFlairID: linkFlairID,
      commentIDs: [],
      views: 0,
    };
    const communityID = dropdown.value;
    createPost(model, post, communityID);
    removePage();
    renderHomePage(model);
  };
  const root = document.getElementById("main");
  root.appendChild(main);
}
// CREATE COMMENT PAGE SECTION
function renderCreateCommentPage(
  model,
  targetID,
  postID = null,
  isReply = false
) {
  const main = document.createElement("main");
  main.id = "create-comment-page";
  main.class = "page";
  main.innerHTML = `
  <header class="header">
    <section id="title">
      <h5>New Comment</h5>
    </section>
  </header>
  <section class="content" id="form">
    <input class="form cmt-author-name" type="text" id="author-name" placeholder="Author *" />
    <textarea class="form cmt-content" id="comment-content" placeholder="Content *"></textarea>
    <button class="submit" id="create-comment-button" disabled>Submit Comment</button>
  </section>`;
  const username = main.querySelector("#author-name");
  const content = main.querySelector("#comment-content");
  const createBtn = main.querySelector("#create-comment-button");

  createAlert(username, "author-error", "Author name is required");
  createAlert(content, "content-error", "Content is required");

  username.addEventListener("input", () => {
    removeAlert(username, "author-error");
    if (username.value === "") {
      createAlert(username, "author-error", "Author name is required");
    }
    createBtn.disabled = !(username.value !== "" && content.value !== "");
  });

  content.addEventListener("input", () => {
    removeAlert(content, "content-error");
    if (content.value === "") {
      createAlert(content, "content-error", "Content is required");
    }
    createBtn.disabled = !(username.value !== "" && content.value !== "");
  });

  createBtn.onclick = () => {
    const comment = {
      commentID: "comment" + (getComments(model).length + 1),
      commentedBy: username.value,
      commentedDate: new Date(),
      content: content.value,
      commentIDs: [],
    };
    createComment(model, comment, targetID, isReply);
    removePage();
    if (!isReply) renderPostPage(model, targetID);
    else {
      renderPostPage(model, postID);
    }
  };

  const root = document.getElementById("main");
  root.appendChild(main);
}

// API SECTION
function getPosts(model, communityID = null) {
  if (communityID) {
    const community = getCommunityByID(model, communityID);
    const posts = [];
    community.postIDs.forEach((postID) => {
      posts.push(getPostByID(model, postID));
    });
    return posts;
  }
  return model.data.posts;
}

function getPostByID(model, postID) {
  return model.data.posts.find((post) => post.postID === postID);
}

function getCommentsByPostID(model, postID) {
  const post = getPostByID(model, postID);
  let comments = [];
  post.commentIDs.forEach((commentID) => {
    comments.push(getCommentByID(model, commentID));
  });
  return comments;
}

function getAllCommentsByPostID(model, postID) {
  const post = model.data.posts.find((post) => post.postID === postID);
  let comments = [];
  post.commentIDs.forEach((commentID) => {
    comments = comments.concat(getCommentsByID(model, commentID));
  });
  return comments;
}

function getRepliesByCommentID(model, commentID) {
  const comment = getCommentByID(model, commentID);
  let replies = [];
  comment.commentIDs.forEach((replyID) => {
    replies.push(getCommentByID(model, replyID));
  });
  return replies;
}

function getCommentsByID(model, commentID) {
  let cursor = getCommentByID(model, commentID);
  let comments = [cursor];
  if (cursor.commentIDs.length === 0) return comments;
  cursor.commentIDs.forEach((commentID) => {
    comments = comments.concat(getCommentsByID(model, commentID));
  });
  return comments;
}

function getCommentByID(model, commentID) {
  return model.data.comments.find((comment) => comment.commentID === commentID);
}

function getComments(model) {
  return model.data.comments;
}

function getLinkFlairs(model) {
  return model.data.linkFlairs;
}

function getLinkFlairByPostID(model, postID) {
  const post = getPostByID(model, postID);
  const linkFlairID = post.linkFlairID;
  if (!linkFlairID) return null;
  return model.data.linkFlairs.find(
    (linkFlair) => linkFlair.linkFlairID === linkFlairID
  );
}

function getCommunities(model) {
  return model.data.communities;
}

function getCommunityByID(model, communityID) {
  return model.data.communities.find(
    (community) => community.communityID === communityID
  );
}

function getCommunityByPostID(model, postID) {
  for (let community of model.data.communities) {
    if (community.postIDs.includes(postID)) {
      return community;
    }
  }
}

function createPost(model, post, communityID) {
  model.data.posts.push(post);
  const community = getCommunityByID(model, communityID);
  community.postIDs.push(post.postID);
}

function createComment(model, comment, targetID, isReply = false) {
  model.data.comments.push(comment);
  const target = isReply
    ? getCommentByID(model, targetID)
    : getPostByID(model, targetID);
  target.commentIDs.push(comment.commentID);
}

function createLinkFlair(model, linkFlair) {
  model.data.linkFlairs.push(linkFlair);
}

function createCommunity(model, community) {
  model.data.communities.push(community);
}

function toRelativeTime(timestamp) {
  const now = new Date();
  const diff = now - timestamp;
  switch (true) {
    case diff < 60000:
      const sec = Math.floor(diff / 1000);
      return sec === 1 ? "1 second ago" : `${sec} seconds ago`;
    case diff < 3600000:
      const min = Math.floor(diff / 60000);
      return min === 1 ? "1 minute ago" : `${min} minutes ago`;
    case diff < 86400000:
      const hour = Math.floor(diff / 3600000);
      return hour === 1 ? "1 hour ago" : `${hour} hours ago`;
    case diff < 604800000:
      const day = Math.floor(diff / 86400000);
      return day === 1 ? "1 day ago" : `${day} days ago`;
    case diff < 2419200000:
      const week = Math.floor(diff / 604800000);
      return week === 1 ? "1 week ago" : `${week} weeks ago`;
    case diff < 29030400000:
      const month = Math.floor(diff / 2419200000);
      return month === 1 ? "1 month ago" : `${month} months ago`;
    default:
      const year = Math.floor(diff / 29030400000);
      return year === 1 ? "1 year ago" : `${year} years ago`;
  }
}

function removeAlert(target, errorID) {
  const error = document.getElementById(errorID);
  if (error) {
    target.style = "";
    error.remove();
  }
}

function createAlert(target, errorID, message) {
  const error = document.createElement("span");
  error.innerText = message;
  error.id = errorID;
  error.className = "error";
  target.insertAdjacentElement("afterend", error);
  target.style = "border: 1px solid #B10707";
}
