import React, { useContext } from "react";
import Dropdown from "../common/Dropdown";
import useDropdown from "../../hooks/useDropdown";
import { ServiceContext, RoutingContext } from "../../contexts/contexts";
import Header from "../wireframe/Header";
import { HeaderType, InputType } from "../../modules/types";
import "../../stylesheets/pages/CreatePostPage.css";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import CircButton from "../common/CircButton";
import useInput from "../../hooks/useInput";
import { Post, LinkFlair } from "../../modules/services/dataclass";
import HomePage from "./HomePage";

export default function CreatePostPage() {
  const [communitySelected, handleCommunitySelect] = useDropdown({
    optionContent: "Select a community*",
    optionValue: null,
  });
  const [linkFlairSelected, handleLinkFlairSelect] = useDropdown({
    optionContent: "Select a linkflair",
    optionValue: null,
  });
  const service = useContext(ServiceContext);
  const { setRoute } = useContext(RoutingContext);
  const communities = service.getAllCommunities();
  const communityOptions = communities.map((community) => {
    return {
      optionID: community.communityID,
      optionValue: community,
      optionContent: community.name,
    };
  });
  const linkflairs = service.getAllLinkFlairs();
  const linkFlairOptions = linkflairs.map((linkflair) => {
    return {
      optionID: linkflair.linkFlairID,
      optionValue: linkflair,
      optionContent: linkflair.content,
    };
  });
  const [authorName, handleAuthorName] = useInput("");
  const [title, handleTitle] = useInput("");
  const [body, handleBody] = useInput("");

  const submit = () => {
    const community = communitySelected.optionValue;
    const linkFlair = linkFlairSelected.optionID
      ? linkFlairSelected.optionValue
      : new LinkFlair({
          linkFlairID: service.getNewLinkFlairID(),
          content: linkFlairSelected.optionValue,
        });
    const post = new Post({
      postID: service.getNewPostID(),
      postedBy: authorName,
      title,
      content: body,
      linkFlair,
      comments: [],
      postedDate: new Date(),
      views: 0,
    });
    if (linkFlair.linkFlairID === service.getNewLinkFlairID()) {
      service.addLinkFlair(linkFlair);
    }
    service.addPost(post, community);
    setRoute(<HomePage />);
  };

  return (
    <>
      <Header type={HeaderType.CREA_POST} content={{ title: "New Post" }} />
      <section id="page-body">
        <section className="create post-body">
          <Dropdown
            options={communityOptions}
            onSelect={handleCommunitySelect}
            value={communitySelected}
            title="Communities"
            required
            requiredContent="Community is required"
          />
          <Input
            type={InputType.INPUT}
            placeholder="Author Name *"
            style={{ width: "20em" }}
            value={authorName}
            onChange={handleAuthorName}
            required
            requiredContent={"Author name is required"}
          />
          <Input
            type={InputType.INPUT}
            placeholder="Title *"
            maxLength={100}
            value={title}
            onChange={handleTitle}
            required
            requiredContent={"Title is required"}
          />
          <Input
            type={InputType.TEXTAREA}
            placeholder="Body *"
            value={body}
            onChange={handleBody}
            required
            requiredContent={"Body is required"}
          />
          <section id="dropdown-linkflair">
            <Dropdown
              options={linkFlairOptions}
              onSelect={handleLinkFlairSelect}
              value={linkFlairSelected}
              title="Linkflairs"
              maxLength={30}
              addNew
            />
            <CircButton
              text="clear"
              size={4}
              onClick={() =>
                handleLinkFlairSelect({
                  optionContent: "Select a linkflair",
                  optionValue: null,
                })
              }
              className="clear"
              style={{ marginLeft: "3.5em" }}
            />
          </section>
          <SubmitButton
            text="Submit Post"
            onClick={() => submit()}
            disabled={
              communitySelected.optionValue === null ||
              authorName === "" ||
              title === "" ||
              body === ""
            }
          />
        </section>
      </section>
    </>
  );
}
