import React, { useContext, useEffect, useRef, useState } from "react";
import Dropdown from "../common/Dropdown";
import useDropdown from "../../hooks/useDropdown";
import { RoutingContext } from "../../contexts/contexts";
import Header from "../wireframe/Header";
import { HeaderType, InputType } from "../../modules/types";
import "../../stylesheets/pages/CreatePostPage.css";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import CircButton from "../common/CircButton";
import useInput from "../../hooks/useInput";
import HomePage from "./HomePage";
import CommunityAPI from "../../apis/community.api";
import PostAPI from "../../apis/post.api";
import LinkFlairAPI from "../../apis/linkflair.api";

export default function CreatePostPage() {
  const [communitySelected, handleCommunitySelect] = useDropdown({
    optionContent: "Select a community*",
    optionValue: null,
  });
  const [linkFlairSelected, handleLinkFlairSelect] = useDropdown({
    optionContent: "Select a linkflair",
    optionValue: null,
  });
  const { setRoute } = useContext(RoutingContext);
  const communities = useRef([]);
  const linkflairs = useRef([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      communities.current = await CommunityAPI.getAllCommunities();
      linkflairs.current = await LinkFlairAPI.getAllLinkFlairs();
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [loading]);

  const communityOptions = communities.current.map((community) => {
    return {
      optionID: community._id,
      optionValue: community,
      optionContent: community.name,
    };
  });

  const linkFlairOptions = linkflairs.current.map((linkflair) => {
    return {
      optionID: linkflair._id,
      optionValue: linkflair,
      optionContent: linkflair.content,
    };
  });
  const [authorName, handleAuthorName] = useInput("");
  const [title, handleTitle] = useInput("");
  const [body, handleBody] = useInput("");

  const submit = async () => {
    const community = communitySelected.optionValue;
    let linkFlair = linkFlairSelected.optionID
      ? linkFlairSelected.optionValue
      : {
          content: linkFlairSelected.optionValue,
        };
    if (!linkFlair.optionID) {
      linkFlair = await LinkFlairAPI.createLinkFlair(linkFlair);
    }
    const post = {
      communityId: community._id,
      postedBy: authorName,
      title,
      content: body,
      linkFlairID: linkFlair._id,
      comments: [],
    };
    await PostAPI.createPost(post);
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
