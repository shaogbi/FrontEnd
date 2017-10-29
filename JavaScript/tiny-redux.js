// filter
const filter = (list, mapper) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    const val = list[i];
    if (mapper(val)) {
      result.push(val);
    }
  }
  return result;
};

filter([2, 4, 3, 5, 1], (e) => e > 3); // [4, 5]



// map
const map = (list, mapper) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(mapper(list[i]));
  }
  return result;
};

map([1, 2, 3], (e) => e + 1); // [2, 3, 4]



// reduce
const reduce = (list, initialValue, reducer) => {
  let acc = initialValue;
  for (let i = 0; i < list.length; i++) {
    const val = list[i];
    acc = reducer(acc, val);
  }
  return acc;
};

reduce([2, 3, 4], 0, (a, b) => a + b); // 9



// redux
const redux = (initialState, reducer) => {
  let currentState = initialState;

  const dispatch = action => {
    currentState = reducer(currentState, action);
  };
  const getState = () => currentState;

  return {
    dispatch,
    getState
  };
};

const reducer = (currentState, action) => {
  switch (action) {
    case "ADD_ONE":
      return currentState + 1;
    case "MINUS_ONE":
      return currentState - 1;
    default:
      return currentState;
  }
};
const store = redux(1, reducer);
const action = "ADD_ONE";
store.dispatch(action);
store.getState(); // 2
