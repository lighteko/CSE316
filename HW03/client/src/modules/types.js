const InputType = Object.freeze({
  INPUT: Symbol("INPUT"),
  TEXTAREA: Symbol("TEXTAREA"),
});

const HeaderType = Object.freeze({
  HOME: Symbol("HOME"),
  SEARCH: Symbol("SEARCH"),
  COMMUNITY: Symbol("COMMUNITY"),
  POST: Symbol("POST"),
  CREA_POST: Symbol("CREA_POST"),
  CREA_COMMUNITY: Symbol("CREA_COMMUNITY"),
  CREA_COMMENT: Symbol("CREA_COMMENT"),
});

const SortType = Object.freeze({
  NEWEST: "newest",
  OLDEST: "oldest",
  ACTIVE: "active",
});

export { InputType, HeaderType, SortType };
