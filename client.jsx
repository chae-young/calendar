import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import store from "./store/configureStore"
import CalendarTodo from "./components/CalendarTodo"

ReactDom.render(
  <Provider store={store()}>
    <CalendarTodo />
  </Provider>,
  document.querySelector("#root"),
)
