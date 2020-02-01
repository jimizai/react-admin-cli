const ADDNAME = "ADDNAME";

function reducer(state = "initRedux", action: any) {
  //形参默认值
  switch (action.type) {
    case ADDNAME:
      return action.data;
    default:
      return state;
  }
}

export { reducer };
