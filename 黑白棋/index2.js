
// Performing a task
let board=[
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
];
let color = 1;
let container=document.getElementById("container");

render();
function render(){
    container.innerHTML="";
    for(let i=0;i<64;i++){
        if(i>0&&i%8===0){
            container.appendChild(document.createElement("br"));
        }
        let x =i % 8, y =(i-i%8)/8;//肯定是整除
        let element =document.createElement("div");
        element.className='cell ${board[i]===1?"black":""} ${board[i]===1?"white":""}';
        container.appendChild(element);

    }
}

