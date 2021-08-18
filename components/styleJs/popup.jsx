
export const stylepop =(e,setStyle,dayName)=>{

    //const [style,setStyle] = useState(null);
    const colWidth = e.target.clientWidth;
    const upY = window.innerHeight/4 > e.clientY ? 0 : '50%';
    const downY = window.innerHeight/4 < e.clientY ? 0 : '50%';
    const transForm = (y)=> y ? 'translateY(-50%)' : null;

    const x = Array(dayName.length).fill().map((v,i)=>colWidth*i)
    const closest = x.reduce((acc,curr)=>{
        return acc<e.clientX && e.clientX<curr ? acc : curr
    })
    if(window.innerWidth/2 < e.clientX){//오른쪽
        const rightX = window.innerWidth - closest;
        if(window.innerHeight/2 > e.clientY){
            console.log('오른쪽위')
            setStyle({
                top:upY,
                //right:(window.innerWidth-e.clientX)+colWidth+'px',
                right:rightX,
                transform:transForm(upY),
            })
        }else{
            console.log('오른쪽 아래')      
            setStyle({
                bottom:downY,
                right:rightX,
                transform:transForm(downY),
            })                         
        }
    }else if(window.innerWidth/2 > e.clientX){//왼쪽
        const leftX = closest + colWidth;
        if(window.innerHeight/2 > e.clientY){
            console.log('왼쪽위')
            setStyle({
                top:upY,
                left:leftX+'px',
                transform:transForm(upY),
            })                  
        }else{
            console.log('왼쪽 아래')    
            setStyle({
                bottom:downY,
                left:leftX+'px',
                transform:transForm(downY),
            })                              
        }            
    }

}