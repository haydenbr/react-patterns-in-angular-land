export function combineReducers(...reducers) {
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
