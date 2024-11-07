import React, { useContext } from "react";
import { RoutingContext } from "../../contexts/contexts";
import CommunityPage from "../pages/CommunityPage";
import "../../stylesheets/components/cards/CommunityCard.css";

export default function CommunityCard({ community }) {
  const { route, setRoute } = useContext(RoutingContext);
  const routeCommunity = route.props.communityId;
  
  const colorOnExactCommunity =
    routeCommunity && routeCommunity === community._id
      ? {
          backgroundColor: "#D9D9D9",
        }
      : {};
  return (
    <div
      style={colorOnExactCommunity}
      id="community-card"
      onClick={() => setRoute(<CommunityPage communityId={community._id} />)}
    >
      <span>{community.name}</span>
    </div>
  );
}
