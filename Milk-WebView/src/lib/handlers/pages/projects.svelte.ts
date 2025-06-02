import { getContext } from "svelte";

function projectsHandler() {
  const state = getContext("page");

  //TODO:Implement API Call

  const link_getter = () => {
  };

  const content_getter = () => {
  };

  return {
    getContent: () => {
      content_getter();
    },
  };
}

export default projectsHandler;
