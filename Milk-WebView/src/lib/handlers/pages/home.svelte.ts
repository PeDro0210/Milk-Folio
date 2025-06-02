import { getContext } from "svelte";

function homeHandler() {
  const state = getContext("page");

  //TODO:Implement API Call

  const link_getter = () => {
  };

  const content_getter = () => {
  };

  return {
    getLinks: () => {
      link_getter();
    },
    getContent: () => {
      content_getter();
    },
  };
}

export default homeHandler;
