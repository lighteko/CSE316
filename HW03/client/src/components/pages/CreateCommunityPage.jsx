import React, { useContext } from "react";
import { RoutingContext } from "../../contexts/contexts";
import Header from "../wireframe/Header";
import { HeaderType, InputType } from "../../modules/types";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import useInput from "../../hooks/useInput";
import CommunityPage from "./CommunityPage";
import CommunityAPI from "../../apis/community.api";

export default function CreateCommunityPage({ setCommunities }) {
  const { setRoute } = useContext(RoutingContext);
  const [creatorName, handleCreatorName] = useInput("");
  const [communityName, handleCommunityName] = useInput("");
  const [description, handleDescription] = useInput("");

  const submit = async () => {
    const newCommunity = {
      name: communityName,
      description,
      members: [creatorName],
      memberCount: 1,
      posts: [],
    };
    const createdCommunity = await CommunityAPI.createCommunity(newCommunity);
    setRoute(<CommunityPage communityId={createdCommunity._id} />);
    setCommunities(await CommunityAPI.getAllCommunities());
  };
  return (
    <>
      <Header
        type={HeaderType.CREA_COMMUNITY}
        content={{ title: "New Community" }}
      />
      <section id="page-body">
        <section className="create community-body">
          <Input
            type={InputType.INPUT}
            onChange={handleCreatorName}
            value={creatorName}
            placeholder="Creator Name *"
            style={{ width: "15em", marginTop: 0 }}
            requiredContent="Creator name is required"
            required
          />
          <Input
            type={InputType.INPUT}
            onChange={handleCommunityName}
            value={communityName}
            placeholder="Community Name *"
            maxLength={100}
            requiredContent="Community name is required"
            required
          />
          <Input
            type={InputType.TEXTAREA}
            onChange={handleDescription}
            value={description}
            placeholder="Description *"
            maxLength={500}
            requiredContent="Description is required"
            required
          />
          <SubmitButton
            onClick={() => submit()}
            text="Engender Community"
            style={{ width: "13em" }}
            disabled={
              creatorName === "" || communityName === "" || description === ""
            }
          />
        </section>
      </section>
    </>
  );
}
