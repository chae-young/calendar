const initialState = {
  nowDay: null,
  addPost: [],
  editMode: false,
  currentPost: null,
  writePopupOpen: false,
  postList: [],
  Color: "",
}

// 액션
export const NOW_DAY = "NOW_DAY"
export const POST_ADD = "POST_ADD"
export const CURRENT_INFO = "CURRENT_INFO"
export const COLOR_SELECT = "COLOR_SELECT"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"
export const WRITE_POPUP_OPEN = "WRITE_POPUP_OPEN"
export const WRITE_POPUP_CLOSE = "WRITE_POPUP_CLOSE"
export const EDIT_MODE_START = "EDIT_MODE_START"
export const EDIT_MODE_CLOSE = "EDIT_MODE_CLOSE"

// 액션 크리에이터 함수
export const dayRequest = (data) => ({
  type: NOW_DAY,
  data,
})
export const listAddRequest = (data) => ({
  type: POST_ADD,
  data,
})
export const currentInfoRequest = (data) => ({
  type: CURRENT_INFO,
  data,
})
export const colorSelectReqeust = (data) => ({
  type: COLOR_SELECT,
  ...data,
})
export const editPostRequest = (data) => ({
  type: EDIT_POST,
  data,
})
export const deletePostRequest = (data) => ({
  type: DELETE_POST,
  data,
})
export const editModeStart = () => ({ type: EDIT_MODE_START })
export const editModeClose = () => ({ type: EDIT_MODE_CLOSE })
export const popupOpen = () => ({ type: WRITE_POPUP_OPEN })
export const popupClose = () => ({ type: WRITE_POPUP_CLOSE })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_MODE_START:
      return {
        ...state,
        editMode: true,
        nowDay: false,
      }
    case EDIT_MODE_CLOSE:
      return {
        ...state,
        editMode: false,
        // nowDay: false,
      }
    case WRITE_POPUP_OPEN:
      return {
        ...state,
        writePopupOpen: true,
      }
    case WRITE_POPUP_CLOSE:
      return {
        ...state,
        currentPost: null,
        writePopupOpen: false,
        editMode: false,
      }
    case NOW_DAY:
      return {
        ...state,
        nowDay: action.data,
      }

    case POST_ADD:
      return {
        ...state,
        postList: [...state.postList, ...action.data],
        addPost: [...action.data],
      }
    case CURRENT_INFO: {
      const post = state.postList.find((v) => v.category === action.data)
      return {
        ...state,

        currentPost: post,
      }
    }
    case EDIT_POST: {
      const postList = state.postList.filter(
        (v) => v.category !== action.data[0].category,
      )
      postList.push(...action.data)
      return {
        ...state,
        postList,
      }
    }
    case DELETE_POST: {
      const postList = state.postList.filter((v) => v.category !== action.data)

      return {
        ...state,
        postList,
      }
    }
    default:
      return state
  }
}

export default reducer
