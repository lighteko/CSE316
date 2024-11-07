import React, { useContext, useEffect, useState } from "react";
import { RoutingContext } from "../../contexts/contexts";
import "../../stylesheets/components/wireframe/NavBar.css";
import RectButton from "../common/RectButton";
import CreateCommunityPage from "../pages/CreateCommunityPage";
import CommunityCard from "../cards/CommunityCard";
import HomePage from "../pages/HomePage";
import CommunityAPI from "../../apis/community.api";

export default function NavBar() {
  const { route, setRoute } = useContext(RoutingContext);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      setCommunities(await CommunityAPI.getAllCommunities());
      setLoading(false);
    }
    setLoading(true);
    fetchCommunities();
  }, []);

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
        {!loading && communities.map((community) => {
          return (
            <CommunityCard key={community._id} community={community} />
          );
        })}
      </section>
    </nav>
  );
}
