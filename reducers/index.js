import moment from "moment"

const initialState = {
  postLoading: false,
  postDone: false,
  postFail: null,
  listAddLoading: false,
  listAddDone: false,
  listAddFail: null,
  currentInfoLoading: false,
  currentInfoDone: false,
  currentInfoFail: false,
  colorSelectLoading: false,
  colorSelectDone: false,
  colorSelectFail: false,
  nowDay: null,
  currentPost: null,
  writePopupOpen: false,
  postList: [
    // {
    //     month:null,
    //     post:null,
    //     weekDay:null,
    //     text:[],
    //     desc:[],
    //
    // }
  ],
  Color: "",
}

export const DAY_REQUEST = "DAY_REQUEST"
export const DAY_SUCCESS = "DAY_SUCCESS"
export const DAY_FAIL = "DAY_FAIL"

export const LIST_ADD_REQUEST = "LIST_ADD_REQUEST"
export const LIST_ADD_SUCCESS = "LIST_ADD_SUCCESS"
export const LIST_ADD_FAIL = "LIST_ADD_FAIL"

export const CURRENT_INFO_REQUEST = "CURRENT_INFO_REQUEST"
export const CURRENT_INFO_SUCCESS = "CURRENT_INFO_SUCCESS"
export const CURRENT_INFO_FAIL = "CURRENT_INFO_FAIL"

export const COLOR_SELECT_REQUEST = "COLOR_SELECT_REQUEST"
export const COLOR_SELECT_SUCCESS = "COLOR_SELECT_SUCCESS"
export const COLOR_SELECT_FAIL = "COLOR_SELECT_FAIL"

export const WRITE_POPUP_OPEN = "WRITE_POPUP_OPEN"
export const WRITE_POPUP_CLOSE = "WRITE_POPUP_CLOSE"

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_POPUP_OPEN:
      return {
        ...state,
        writePopupOpen: true,
      }
    case WRITE_POPUP_CLOSE:
      return {
        ...state,
        writePopupOpen: false,
      }
    case DAY_REQUEST:
      return {
        ...state,
        postLoading: true,
        postDone: false,
        nowDay: action.data,
      }
    case DAY_SUCCESS:
      return {
        ...state,

        postLoading: false,
        postDone: true,
      }
    case DAY_FAIL:
      return {
        ...state,
        postLoading: false,
        postFail: action.error,
      }
    case LIST_ADD_REQUEST:
      return {
        ...state,
        listAddLoading: true,
        listAddDone: false,
      }
    case LIST_ADD_SUCCESS: {
      return {
        ...state,
        listAddLoading: false,
        listAddDone: true,
        postList: [...state.postList, ...action.data],
      }
    }
    case LIST_ADD_FAIL:
      return {
        ...state,
        listAddLoading: false,
        listAddFail: action.error,
      }
    case CURRENT_INFO_REQUEST:
      return {
        ...state,
        currentInfoLoading: true,
        currentInfoDone: false,
      }
    case CURRENT_INFO_SUCCESS: {
      const post = state.postList.find((v) => v.id === action.data.id)
      return {
        ...state,
        currentInfoLoading: false,
        currentPost: post,
        currentInfoDone: true,
      }
    }
    case CURRENT_INFO_FAIL:
      return {
        ...state,
        currentInfoLoading: false,
        currentInfoFail: action.error,
      }
    default:
      return state
  }
}

export default reducer
