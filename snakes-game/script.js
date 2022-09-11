console.log('this is snake game')


let X = ['560' , '675' , '770' , '875' , '980' , '1085' , '1190' , '1290'];
let Y = ['110' , '215' , '320' , '425' , '530' , '635' , '740' , '845'];


function getRandomPoints(){
    let randX = Math.floor(Math.random()*100);
    let randY = Math.floor(Math.random()*100);
    if(randX>=8){
        randX = Math.floor(randX%7);
    }
    if(randY>=8){
        randY = Math.floor(randY%7);
    }
    return {x : X[randX] , y : Y[randY]};
}

function getNextRight(x){
    let nextX=0;
    for(let i=0;X.length();i++){
        if(X[i]==x){
            nextX=X[i+1];
            break;
        }
    }
    return nextX;
}

function getNextLeft(x){
    let nextX =0;
    for(let i=0;X.length();i++){
        if(X[i]==x){
            nextX=X[i-1];
            break;
        }
    }
    return nextX;
}

function getNextUp(y){
    let nextY =0;
    for(let i=0;Y.length();i++){
        if(Y[i]==y){
            nextY=Y[i-1];
            break;
        }
    }
    return nextY;
}

function getNextDown(y){
    let nextY =0;
    for(let i=0;Y.length();i++){
        if(Y[i]==y){
            nextY=Y[i+1];
            break;
        }
    }
    return nextY;
}


class Snake{
    constructor(x , y ){ 
        console.log('inside snake constructor')
        // create a snake body image here
        let snake = new Image();
        snake.className = 'snake0';
        snake.src = './assets/snake-body.png';
        snake.style.width = '72px';
        snake.style.height = '72px';
        snake.style.top = y;
        snake.style.left = x;

        this.snakeNode = snake;
        this.next = null;
        this.x=x;
        this.y=y;

        console.log(this.snakeNode);
    
    }
}

class SnakeList{
    constructor(){
        console.log('inside snakeList')
        let head = new Snake('560px' , '110px');

        console.log(head);

        const holder2 = document.getElementById('outer');
        holder2.appendChild(head.snakeNode);


        this.head = head;
        console.log(this.head);
        this.size = 1;
        this.direction = 'right';
    }

    add(){
        let node = new Snake(x,y);
        
        if(this.head == null){
            this.head = node;
        }else{
            let current = this.head;

            while(current.next){
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    updateSnake(){
        // traversing the entire linked list and updating the coordinates
        // starting direction of start : right
        var current = this.head;
        console.log(current);
        while(current){
            current = current.next;
            current.snakeNode.style.left = getNextLeft(current.x)
        }
    }
}

function init() {


    var fruits = ['apple' , 'banana' , 'cherry' , 'grapes' , 'orange' , 'strawberry' , 'watermelon'];
    let number = Math.floor(Math.random()*100)
    if(number>=7){
        number = Math.floor(number%7);
    }
    

    // creating coordinates for the fruitimage
    
    const {x : fruitX , y : fruitY} = getRandomPoints();

    console.log('X fruit : ' ,fruitX);
    console.log('Y fruit : ' , -fruitY);
    console.log('number : ' , number);
    

    // creating an image
    var fruitImage = new Image();
    fruitImage.className = 'fruit';
    fruitImage.src = `./assets/${fruits[number]}.png`
    console.log('uploading image fruit...')
    fruitImage.className = 'fruit';
    
    
    //document.getElementById('holder').style.marginLeft = `${fruitX}px`;
    //document.getElementById('holder').style.marginTop = `-${fruitY}px`;
    

    fruitImage.height = "64";
    fruitImage.width = "64";

    var holder = document.getElementById('outer');
    holder.appendChild(fruitImage);


    // Snake
    let ll = new SnakeList();
    setInterval(ll.updateSnake ,500);


}

init();