type Reducer = (state: any, changes: any) => any;

export function combineReducers(...reducers: Reducer[]) {
  return (state: any, changes: any) => {
    for (let reducer of reducers) {
      const result = reducer(state, changes);
      if (result !== changes) {
        return result;
      }
    }
    return changes;
  };
}
