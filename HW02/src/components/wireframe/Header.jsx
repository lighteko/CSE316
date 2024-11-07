import React from "react";
import "../../stylesheets/components/wireframe/Header.css";
import { HeaderType, SortType } from "../../modules/types";
import CircButton from "../common/CircButton";

export default function Header({ type, content }) {
  const header = {
    content: <></>,
    sortTypes: (
      <section className="sort-types">
        <CircButton
          text="Newest"
          onClick={() => content.setSortType(SortType.NEWEST)}
          size={6}
        />
        <CircButton
          text="Oldest"
          onClick={() => content.setSortType(SortType.OLDEST)}
          size={6}
        />
        <CircButton
          text="Active"
          onClick={() => content.setSortType(SortType.ACTIVE)}
          size={6}
        />
      </section>
    ),
  };
  switch (type) {
    case HeaderType.HOME:
    case HeaderType.SEARCH:
      header.content = (
        <section className={"default-header"}>
          <h1>{content.title}</h1>
          <span>{content.count}</span>
        </section>
      );
      break;
    case HeaderType.COMMUNITY:
      header.content = (
        <section className="community-header">
          <h1>{content.name}</h1>
          <p>{content.description}</p>
          <p id="timestamp">Created {content.timestamp}</p>
          <span>
            {content.postCount} • {content.memberCount}
          </span>
        </section>
      );
      break;
    case HeaderType.POST:
      header.content = (
        <section className="community-header">
          <p>
            {content.community.name} • {content.timestamp}
          </p>
          <span>{content.postedBy}</span>
          <h1>{content.title}</h1>
          {content.linkFlair && <span>{content.linkFlair.content}</span>}
        </section>
      );
      break;
    case HeaderType.CREA_POST:
    case HeaderType.CREA_COMMUNITY:
    case HeaderType.CREA_COMMENT:
      header.content = (
        <section className="create-header">
          <h1>{content.title}</h1>
        </section>
      );
      break;
    default:
      return null;
  }
  return (
    <header className="header">
      {header.content}
      {content.showSortTypes && header.sortTypes}
    </header>
  );
}
