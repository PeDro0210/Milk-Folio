import { getContext } from "svelte";

function aboutMeHandler() {
  const state = getContext("page");

  //TODO:Implement API Call

  const link_getter = () => {
    return;
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

export default aboutMeHandler;
