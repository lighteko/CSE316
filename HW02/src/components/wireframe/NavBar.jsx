import React, { useContext, useState } from "react";
import { RoutingContext, ServiceContext } from "../../contexts/contexts";
import "../../stylesheets/components/wireframe/NavBar.css";
import RectButton from "../common/RectButton";
import CreateCommunityPage from "../pages/CreateCommunityPage";
import CommunityCard from "../cards/CommunityCard";
import HomePage from "../pages/HomePage";

export default function NavBar() {
  const { route, setRoute } = useContext(RoutingContext);
  const service = useContext(ServiceContext);
  const [communities, setCommunities] = useState(service.getAllCommunities());

  const colorOnPageView = (page) => {
    if (route.type === page) {
      return {
        backgroundColor: "#ff4500",
        color: "white",
      };
    }
    return {};
  };
  return (
    <nav className="nav-bar">
      <a href="/" id="home" style={colorOnPageView(HomePage)}>
        Home
      </a>
      <div id="communities">
        <h3>Communities</h3>
      </div>
      <RectButton
        text="Create Community"
        className="crea-comm"
        style={colorOnPageView(CreateCommunityPage)}
        onClick={() =>
          setRoute(<CreateCommunityPage setCommunities={setCommunities} />)
        }
      />
      <section id="community-list">
        {communities.map((community) => {
          return (
            <CommunityCard key={community.communityID} community={community} />
          );
        })}
      </section>
    </nav>
  );
}
