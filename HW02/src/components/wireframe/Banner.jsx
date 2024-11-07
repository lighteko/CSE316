import React, { useContext } from "react";
import { RoutingContext } from "../../contexts/contexts";
import CircButton from "../common/CircButton";
import Input from "../common/Input";
import { InputType } from "../../modules/types";
import "../../stylesheets/components/wireframe/Banner.css";
import CreatePostPage from "../pages/CreatePostPage";
import useInput from "../../hooks/useInput";
import SearchPage from "../pages/SearchPage";
import HomePage from "../pages/HomePage";

export default function Banner() {
  const { route, setRoute } = useContext(RoutingContext);
  const [value, handleChange] = useInput("");
  return (
    <section id="banner">
      <h3
        id="banner-logo"
        style={{ cursor: "pointer" }}
        onClick={() => setRoute(<HomePage />)}
      >
        Phreddit
      </h3>
      <Input
        className="search"
        name="searchbar"
        type={InputType.INPUT}
        placeholder="Search Phreddit"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setRoute(<SearchPage query={value} />);
          }
        }}
      />
      <CircButton
        style={
          route.type === CreatePostPage
            ? { backgroundColor: "#ff4500", color: "white" }
            : {}
        }
        text="Create Post"
        size={10}
        onClick={() => setRoute(<CreatePostPage />)}
      />
    </section>
  );
}
