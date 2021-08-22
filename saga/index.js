import { all, fork, put, delay, takeLatest } from "redux-saga/effects"
import {
  DAY_REQUEST,
  DAY_SUCCESS,
  DAY_FAIL,
  LIST_ADD_REQUEST,
  LIST_ADD_SUCCESS,
  LIST_ADD_FAIL,
  CURRENT_INFO_REQUEST,
  CURRENT_INFO_SUCCESS,
  CURRENT_INFO_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
} from "../reducers"

function* testAPI() {}

function* day(action) {
  try {
    yield delay(1000)
    yield put({
      type: DAY_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: DAY_FAIL,
      error: err.response.data,
    })
  }
}
function* listAdd(action) {
  try {
    yield delay(1000)
    yield put({
      type: LIST_ADD_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: LIST_ADD_FAIL,
      error: err.response.data,
    })
  }
}
function* currentInfo(action) {
  try {
    yield delay(1000)
    yield put({
      type: CURRENT_INFO_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: CURRENT_INFO_FAIL,
      error: err.response.data,
    })
  }
}
function* editPost(action) {
  try {
    yield delay(1000)
    yield put({
      type: EDIT_POST_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: EDIT_POST_FAIL,
      error: err.response.data,
    })
  }
}

function* watchDay() {
  yield takeLatest(DAY_REQUEST, day)
}
function* watchListAdd() {
  yield takeLatest(LIST_ADD_REQUEST, listAdd)
}
function* watchCurrentInfo() {
  yield takeLatest(CURRENT_INFO_REQUEST, currentInfo)
}
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost)
}

export default function* rootSaga() {
  yield all([
    fork(watchDay),
    fork(watchListAdd),
    fork(watchCurrentInfo),
    fork(watchEditPost),
  ])
}
