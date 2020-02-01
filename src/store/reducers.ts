const ADDNAME = "ADDNAME";

function reducer(state = "initRedux", action: any) {
  switch (action.type) {
    case ADDNAME:
      return action.data;
    default:
      return state;
  }
}

export { reducer };
