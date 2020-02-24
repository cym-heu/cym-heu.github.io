
// Performing a task
let board=[
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
let color = 1;
let container=document.getElementById("container");

render();
function render(){
    container.innerHTML="";//每走一格就重新渲染一次
    for(let y=0; y<8; y++){
        for(let x=0; x<8; x++){
            let element = document.createElement("div");
            element.addEventListener("click",(event)=> {
                //console.log(x,y);
                let ox= x,oy= y;
                let hasOpposite = false;
                let canMove=false;
                let flag=false;
                if(board[y][x]!==0)
                    return;

                while(--x >= 0){    //找子
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }   
                }
                if(canMove){    //吃子
                    while(x++ != ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                y=oy;
                x=ox;

                while(++x <= 7){    //找子
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }   
                }
                if(canMove){    //吃子
                    while(x-- != ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                y=oy;
                x=ox;

                while(--y >= 0){    //找子
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }   
                }
                if(canMove){    //吃子
                    while(y++ != oy){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                x=ox;
                y=oy;

                while(++y <= 7){    //找子
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }   
                }
                if(canMove){    //吃子
                    while(y-- != oy){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                x=ox;
                y=oy;

                while(++y<=7&&++x<=7){
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }                    
                }
                if(canMove){    //吃子
                    while(y-- != oy&&x-- !=ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                x=ox;
                y=oy;

                while(--y>=0&&--x>=0){
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }                    
                }
                if(canMove){    //吃子
                    while(y++ != oy&&x++ !=ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                x=ox;
                y=oy;

                while(++y<=7&&--x>=0){
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }                    
                }
                if(canMove){    //吃子
                    while(y-- != oy&&x++ !=ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }
                canMove=false;
                hasOpposite=false;
                x=ox;
                y=oy;

                while(--y>=0&&++x<=7){
                    if(board[y][x] === 3-color)
                        hasOpposite=true;
                    if(board[y][x] === color){
                        if(hasOpposite)
                            canMove=true;
                        break;
                    }
                    if(board[y][x] == 0){
                        break;
                    }                    
                }
                if(canMove){    //吃子
                    while(y++ != oy&&x-- !=ox){
                        board[y][x] = color;
                    }
                    flag=true;
                }


                if(flag==true){
                    color=3-color;//换颜色
                }
                

                render();
            })
            element.style="vertical-align:bottom;border:solid 1px white;width:50px;height:50px;background-color:green;display:inline-block";
            container.appendChild(element);
            if(board[y][x]==1){
                let disc = document.createElement("div");//黑棋
                disc.style = "margin-top:5px;margin-left:5px;border-radius:20px;width:40px;height:40px;background-color:black";
                element.appendChild(disc);
            }
            if(board[y][x]==2){
                let disc = document.createElement("div");//白棋
                disc.style = "margin-top:5px;margin-left:5px;border-radius:20px;width:40px;height:40px;background-color:white";
                element.appendChild(disc);
            }
        }
        container.appendChild(document.createElement("br"));
    }
}

