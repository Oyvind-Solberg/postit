import { useState, useEffect } from 'react';

let globalState = {};
let listners = [];
let asyncActions = {};
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const asyncDispatch = async (actionIdentifier, payload) => {
    const newState = await asyncActions[actionIdentifier](globalState, payload);

    if (newState !== undefined) {
      globalState = { ...globalState, ...newState };
    }

    for (const listner of listners) {
      listner(globalState);
    }
  };

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);

    globalState = { ...globalState, ...newState };

    for (const listner of listners) {
      listner(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listners = listners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, asyncDispatch, dispatch];
};

export const initStore = (userAsyncAction, userAction, initalState) => {
  if (initalState) {
    globalState = { ...globalState, ...initalState };
  }

  asyncActions = { ...asyncActions, ...userAsyncAction };

  actions = { ...actions, ...userAction };
};
