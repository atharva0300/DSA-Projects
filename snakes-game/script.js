console.log('this is snake game')


let X = ['560' , '665' , '770' , '875' , '980' , '1085' , '1190' , '1295'];
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
    for(let i=0;X.length;i++){
        if(X[i]==x){
            nextX=X[i+1];
            break;
        }
    }
    console.log('next X : ' , nextX);
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
    console.log('next right : ' , nextX);
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
    constructor(x , y  , id){ 
        console.log('inside snake constructor')
        // create a snake body image here
        let snake = new Image();
        snake.className =  `snake${id}`;
        snake.src = './assets/snake-body.png';
        snake.style.width = '72px';
        snake.style.height = '72px';
        snake.style.top = `${y}px`;
        snake.style.left = `${x}px`;
        console.log('new node x : ' , x);
        console.log('new node y : ' , y);
        console.log('new node id : ' , id);
        console.log('top : ' , snake.style.top)
        console.log('left : ' , snake.style.left);
        console.log('snake : ' , snake);

        this.snakeNode = snake;
        this.next = null;
        this.x=parseInt(x);
        this.y=parseInt(y);
        this.prevX = parseInt(x);
        this.prevY = parseInt(y);

        console.log('initial snakeNode : ' , this.snakeNode);
    
    }
}

class SnakeList{
    constructor(){
        console.log('inside snakeList')
        let head = new Snake('560' , '110' , 0);

        console.log(head);

        const holder2 = document.getElementById('outer');
        holder2.appendChild(head.snakeNode);


        this.head = head;
        console.log(this.head);
        this.size = 1;
        this.direction = 'right';
        this.tail = head;
    }

    add(){
        let node = new Snake(this.tail.prevX,this.tail.prevY , this.size);
        
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

    isEmpty(){
        if(this.size==0){
            return true;
        }
        return false;
    }

    checkDirection(){
        console.log(this.direction);
    }
}

var fruitPoints = []

function createFruit(){

    var fruits = ['apple' , 'banana' , 'cherry' , 'grapes' , 'orange' , 'strawberry' , 'watermelon'];
    let number = Math.floor(Math.random()*100)
    if(number>=7){
        number = Math.floor(number%7);
    }
    

    // creating coordinates for the fruitimage
    
    var {x : fruitX , y : fruitY} = getRandomPoints();

    console.log('X fruit : ' ,fruitX);
    console.log('Y fruit : ' , -fruitY);
    console.log('number : ' , number);

    /*
    fruitX = '875px';
    fruitY = '110px';
    */

    // creating an image
    var fruitImage = new Image();
    fruitImage.className = 'fruit';
    fruitImage.src = `./assets/${fruits[number]}.png`
    console.log('uploading image fruit...')
    fruitImage.className = 'fruit';
    
    
    fruitImage.style.left = `${fruitX}px`;
    fruitImage.style.top = `${fruitY}px`;
    

    fruitImage.height = "64";
    fruitImage.width = "64";

    var holder = document.getElementById('outer');
    holder.appendChild(fruitImage);

    fruitPoints.push(fruitX);
    fruitPoints.push(fruitY);

    return fruitImage;

}

function deleteFruit(fruitImage){
    var holder = document.getElementById('outer');
    holder.removeChild(fruitImage);
}

var score = 0;

function updateScore(){
    var scoreBoard =document.getElementById('score');
    scoreBoard.innerHTML = `Score : ${score}`;
    score++;
}


function init() {
    // update the scoreboard
    updateScore();

    // creating a fruitImage
    let fruitImage = createFruit();
    let fruitX = fruitPoints[0];
    let fruitY = fruitPoints[1];

    // Snake
    let ll = new SnakeList();
    console.log(ll.isEmpty());
    let myInterval = setInterval(() => {
        var current = ll.head;
        if(current==null){
            console.log('current is null');
        }

        while(current){


            // checking direction
            // if right
            if(ll.direction=='right'){
                let tempX = current.x;
                let tempY = current.y;
                current.x = current.x + 105;
                console.log(current.x);
                current.snakeNode.style.left = `${current.x}px`;
                current.prevX = tempX;
                current.prevY = tempY;
            }else if(ll.direction=='left'){
                let tempX = current.x;
                let tempY = current.y;
                current.x = current.x - 105;
                console.log(current.x);
                current.snakeNode.style.left = `${current.x}px`;
                current.prevX = tempX;
                current.prevY = tempY;
            }else if(ll.direction=='up'){
                let tempY = current.y;
                let tempX = current.x;
                current.y = current.y - 105;
                console.log(current.y);
                current.snakeNode.style.top = `${current.y}px`;
                current.prevY = tempY;
                current.prevX = tempX;
            }else if(ll.direction=='down'){
                let tempY = current.y;
                let tempX = current.x;
                current.y = current.y + 105;
                console.log(current.y);
                current.snakeNode.style.top = `${current.y}px`;
                current.prevY = tempY;
                current.prevX = tempX;
            }
            
            console.log(current.x , fruitX);
            console.log(current.y , fruitY);

            let current2 = ll.head;
            if(current2.x==fruitX && current2.y==fruitY){
                console.log('found the fruit!');    
                deleteFruit(fruitImage);
                let newFruit = createFruit();
                console.log('new fruit x : ' , newFruit.style.left);
                fruitX = parseInt(newFruit.style.left.slice(0,-2));
                fruitY = parseInt(newFruit.style.top.slice(0,-2));
                fruitImage = newFruit;
                updateScore();
            }


            current = current.next;
        }

        // checking keypresse and detecting the key codes
        document.onkeydown = checkKey;

        function checkKey(e) {

            e = e || window.event;
            console.log(e.keyCode);
            if (e.keyCode == '38') {
                // right arrow
                ll.direction = 'up';
            }
            else if (e.keyCode == '40') {
                // down arrow
                ll.direction = 'down';
            }
            else if (e.keyCode == '37') {
                // left arrow
                ll.direction = 'left'
            }
            else if (e.keyCode == '39') {
                // right arrow
                ll.direction = 'right';
            }

        }

        ll.checkDirection();

    } , 500);



}

init();