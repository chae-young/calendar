// export default (e, setStyle, colTop, popup) => {
//   const colWidth = e.target.clientWidth
//   const upY = Math.min(colTop, e.clientY)

//   const x = Array(7)
//     .fill()
//     .map((v, i) => colWidth * i)
//   const closest = x.reduce((acc, curr) => {
//     return acc < e.clientX && e.clientX < curr ? acc : curr
//   })
//   console.log(e.clientY, popup)
//   if (window.innerWidth < 1199) {
//     setStyle({
//       top: 0,
//       left: 0,
//     })
//   } else if (window.innerWidth / 2 < e.clientX) {
//     // 오른쪽
//     const rightX = window.innerWidth - closest
//     if (window.innerHeight / 2 > e.clientY) {
//       console.log("오른쪽위")
//       setStyle({
//         top: upY,
//         right: rightX,
//       })
//     } else {
//       console.log("오른쪽 아래")
//       setStyle({
//         top: upY,
//         right: rightX,
//       })
//     }
//   } else if (window.innerWidth / 2 > e.clientX) {
//     // 왼쪽
//     const leftX = closest + colWidth
//     if (window.innerHeight / 2 > e.clientY) {
//       console.log("왼쪽위")
//       setStyle({
//         top: upY,
//         left: `${leftX}px`,
//       })
//     } else {
//       console.log("왼쪽 아래")
//       setStyle({
//         top: upY,
//         left: `${leftX}px`,
//       })
//     }
//   }
// }
