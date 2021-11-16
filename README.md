<br>
<br>

# React Calendar

![CALENDAR_ALL](https://user-images.githubusercontent.com/28029685/134292930-ea7d80b2-72e0-4210-a919-8f76181d9a0e.gif)
<br>
<br>
<br>
<br>

## &#127912; 프로젝트 소개

일정관리를 할 수 있는 캘린더 입니다. </br>
기본적으로 일정 추가,삭제,수정,컬러 선택 기능을 구현하였고
redux-thunk 의 사용법을 익혀보고자 thunk를 사용하였습니다.

<br>
<br>

## 👀 stack

React,Redux,Redux-thunk,webpack,bootstrap,style-components

<br>
<br>

## 💻 구현기능 및 동작 원리

**1. 해당 날짜 클릭시 모달창 구현**</br>

캘린더 내 날짜를 선택하면 일정을 추가할 수 있는 모달창이 나오도록 하였다.

- 칸 클릭시 해당칸 위치값 구하여 모달창이 나오도록 설정
- 모달창 위치 설정 코드를 재사용성의 가능성과 코드가 길어짐에 따라 custom hooks로 분리함.

<br>
<br>

**2. 일정 color 선택**

컬러를 선택하면 해당컬러가 일정에 입혀지도록 하였다.

- 컴포넌트내 객체에 컬러를 담음.
- Object.values를 사용하여 컬러 객체 index와 li의 index가 같으면 컬러가 선택되도록함.
- 기본컬러는 gray

<br>
<br>

**3. 더보기 버튼 및 상세일정 리스트 모달창 구현**

2개 이상 일정을 등록하게되면 더보기 버튼 구현. </br>
그외 일정은 리스트 모달창으로 나오게끔 하였다.

- MoreListPopup컴포넌트가 리스트 모달창이며 부모 컴포넌트(Day)에서 일정 데이터가 props로 전달되도록 하였다

<br>
<br>

**4. 일정 수정**

일정 클릭시 일정의 모든 내용이 나오며 수정,삭제가 가능. </br>
수정아이콘 클릭시 기존 모달창에 수정하고 싶은 날짜,내용이 나오도록 함

- useEffect를 사용하여 리덕스 데이터(currentPost)가 불려오면 기존 모달창에 수정내용으로 나오게 함.
- 이때 edit state값이 true가 되며 edit true일경우에 수정내용이 저장되도록 하였기 때문에 저장을 클릭하면 수정내용이 저장됨.

<br>
<br>

## 🔨 보완하고 싶은점

- 일정 범주</br>

  일정 구간을 선택하면 캘린더에 범주설정이 되도록 하고싶다.
  범주설정까지는 칸 별로 계산을 하여 구현을 했었지만 일정이 추가될수록 범주의 위치를 잡는게 생각보다 복잡해지고 수정할게 많아져서 중간에 뺐다..
  이거는 좀더 소스를 찾아보고 데이터구조를 바꾸거나 해서 수정을 해봐야 할 것같다.

  <br>
  <br>

- 리렌더링

  렌더링이 많이 일어나는거 같아서 컴포넌트를 분리하거나 React.memo를 사용하여 방지해야 할 것같다.
  이건 추후 수정예정이다.

<br>
<br>

## 🤷 프로젝트 문제 및 해결(MY TALK!)

- 커스텀 hooks 사용하기 </br>
  모달창 위치 구현코드를 custom hooks로 분리할때 오류가 많았다. infinite rerendering 에러가 난다던지 hooks 문법에 안맞는다 라는 오류를 계속 접했다.
  그래서 위치 구현코드는 컴포넌트내에 있을 필요가 없을것 같아서 함수로 따로 빼고 useEffect를 사용하여 칸을 클릭할때 함수를불러오도록 하였다.
  이렇게 코드를 바꾸니 에러가 안났다. 컴포넌트가 계속 렌더링 되서 오류가 난거같았다. 커스텀 hooks는 많이 사용해봐야 될것같다.

- localeCompare 사용
  배열 내 객체의 값에 따라 정렬을 하고 싶었다. localeCompare메소드를 사용하여 해결 할 수 있었다. 이건 몰랐던 방법이라 프로젝트를 하면서 메소드 하나를 알게되어서 공부가 되었다.
