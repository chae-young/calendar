import { createStore, compose, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import reducer from "../reducers"
import rootSaga from "../saga"

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action)
    return next(action)
  }

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middelewears = [sagaMiddleware, loggerMiddleware]

  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middelewears))
      : composeWithDevTools(applyMiddleware(...middelewears))
  const store = createStore(reducer, enhancer)
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}
