import { createStore, compose, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from "../reducers"

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action)
    return next(action)
  }

export default function configureStore() {
  const middelewears = [thunk, loggerMiddleware]

  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middelewears))
      : composeWithDevTools(applyMiddleware(...middelewears))
  const store = createStore(reducer, enhancer)

  return store
}
