var a = document.getElementById('board');
a.style.display="grid";
a.style.gridTemplateColumns="auto auto auto auto auto auto auto auto";
a.style.height="560px";
a.style.width="560px";
a.style.marginTop="4rem"


x=1, y=1;
for(i=0; i<64; i++){
  const boxes = document.createElement('div');
  const img =document.createElement('img');
  boxes.style.display="flex";
 boxes.style.justifyContent="center";
 boxes.style.alignItems="center";


 img.setAttribute("alt","");
  img.setAttribute("src","#");
  img.classList.add("imagepiece");
  img.style.width="40px";
 
  boxes.classList.add('box');
  a.appendChild(boxes);
  boxes.appendChild(img);
  boxes.setAttribute("data-xIndex", x);
  boxes.setAttribute("data-yIndex", y);
  boxes.setAttribute("data-cords",`(${x},${y})`)
  // boxes.innerText = "(" +x+ "," +y+ ")";
  if ((x+y) %2 ==0){
    boxes.style.backgroundColor ="plum"
  }
  else{
    boxes.style.backgroundColor ="purple"
  }
  x++;
  if(x >8){
    x=1;
    y++
  }
}
const showmoves =(piece)=>{
  const moves = piece.moves;
  moves.forEach(m =>{
    for(const boxes of boxes1){
      if(m.x == boxes.dataset.xindex && m.y == boxes.dataset.yindex){
        if (boxes.dataset.color == piece.color) {
          boxes.classList.add("cantkill")
        }
        else {
          boxes.classList.add("cankill")
        }
        if (boxes.dataset.color == "" || boxes.dataset.name == null || boxes.dataset.name == undefined) {
        boxes.classList.remove("cankill")
        boxes.classList.add("possibleMove");
        }

      }
    }
  })
}
const restpossiblemoves =(piece) =>{
  const moves = piece.moves;
  moves.forEach(m =>{
    for(const boxes of boxes1){
      if(m.x == boxes.dataset.xindex && m.y == boxes.dataset.yindex){
        boxes.classList.remove("possibleMove");
        boxes.classList.remove("cankill");
        boxes.classList.remove("cantkill");
      }
    }
  })
}
class piece{
    constructor(color,name,initialx,initialy,image){
        this.color = color;
        this.name = name;
        this.initialpos ={
          x: initialx,
          y: initialy

        };
        this.currentpos={
          x: initialx,
          y: initialy
        }
        this.image = image;
        this.moves = [];
    }

}

class Pawn extends piece{
  constructor(color, name, initialx, initialy, image){
    super(color, name, initialx, initialy, image);
  this.initialMove = true;
  }
  getpossibleMoves = () =>{
    if(this.color == "black"){
      this.moves.push({
        x:this.currentpos.x,
        y:this.currentpos.y + 1

      })
    }
    else{
      this.moves.push({
        x:this.currentpos.x,
        y:this.currentpos.y - 1
      })
    }
    showmoves(this)
  }
  

}


class rook extends piece{
  constructor(color,name,initialx,initialy,image){
    super(color,name,initialx,initialy,image);

  }
  getpossibleMoves = () =>{ 
    if(this.moves.length){
      validateRookMovesArr(this)
      showmoves(this);
      return;
    }
    let x=7, y=7;
    while(x > 0){
      let newX = this.currentpos.x + x;

      if(newX >8){
        newX -= 8
      }
      this.moves.push({
        x: newX,
        y: this.currentpos.y
      });
      x--;
    }
    while(y>0){
      let newY = this.currentpos.y + y;
      if(newY >8){
        newY -= 8
      }
      this.moves.push({
        x: this.currentpos.x,
        y: newY
      });
      y--;
    }
    let validartemoves = validateRookMovesArr(this);
    this.moves=validartemoves;
    showmoves(this)
  } 
}
class knight extends piece{
  constructor(color,name,initialx,initialy,image){
    super(color,name,initialx,initialy,image);
  }
    getpossibleMoves =() => {
      if(this.moves.length){
        showmoves(this);
        return;
      }
      let newX, newY;
      newX = this.currentpos.x+2;
      newY = this.currentpos.y-1;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x+2;
      newY = this.currentpos.y-1;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x+2;
      newY = this.currentpos.y+1;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x-2;
      newY = this.currentpos.y-1;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x-2;
      newY = this.currentpos.y+1;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x+1;
      newY = this.currentpos.y+2;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x-1;
      newY = this.currentpos.y+2;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x+1;
      newY = this.currentpos.y-2;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      newX = this.currentpos.x-1;
      newY = this.currentpos.y-2;
      if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
      showmoves(this)
    }

  
}
class bishop extends piece{
  constructor(color,name,initialx,initialy,image){
    super(color,name,initialx,initialy,image);

  }
  getpossibleMoves = () =>{
    if(this.moves.length){
      showmoves(this);
      return;
    }
    let x=7, y=1;
    while(x >0){
      let newX =this.currentpos.x + x;
      let newY = this.currentpos.y + x;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      x--;
    }
    while(y < 7){
      let newX =this.currentpos.x - y;
      let newY = this.currentpos.y - y;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      y++;
    }
    x = 7, y = 1; 
    while(x > 0){
      let newX =this.currentpos.x - x;
      let newY = this.currentpos.y + x;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      x--;
    }
    while(y < 7){
      let newX =this.currentpos.x + y;
      let newY = this.currentpos.y - y;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      y++;
    }
    showmoves(this)


   }
}
class queen extends piece{
  constructor(color,name,initialx,initialy,image){
    super(color,name,initialx,initialy,image);

  }
  getpossibleMoves = () =>{ 
    if(this.moves.length){
      showmoves(this);
      return;
    }
    let x=7, y=7;
    while(x > 0){
      let newX = this.currentpos.x + x;

      if(newX >8){
        newX -= 8
      }
      this.moves.push({
        x: newX,
        y: this.currentpos.y
      });
      x--;
    }
    while(y>0){
      let newY = this.currentpos.y + y;
      if(newY >8){
        newY -= 8
      }
      this.moves.push({
        x: this.currentpos.x,
        y: newY
      });
      y--;
    }
     x=7, y=1;
    while(x >0){
      let newX =this.currentpos.x + x;
      let newY = this.currentpos.y + x;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      x--;
    }
    while(y < 7){
      let newX =this.currentpos.x - y;
      let newY = this.currentpos.y - y;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      y++;
    }
    x = 7, y = 1; 
    while(x > 0){
      let newX =this.currentpos.x - x;
      let newY = this.currentpos.y + x;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      x--;
    }
    while(y < 7){
      let newX =this.currentpos.x + y;
      let newY = this.currentpos.y - y;
      if(newX > 0 && newX <9 && newY > 0 && newY < 9)this.moves.push({
        x: newX, y:newY
      });
      y++;
    }
    showmoves(this)


  }
}
class king extends piece{
  constructor(color,name,initialx,initialy,image){
    super(color,name,initialx,initialy,image)
  }
  getpossibleMoves = () =>{
    if(this.moves.length){
      showmoves(this);
      return;
    }
    let newX, newY;
    newX = this.currentpos.x+1;
    newY = this.currentpos.y+1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x;
    newY = this.currentpos.y+1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x-1;
    newY = this.currentpos.y;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x-1;
    newY = this.currentpos.y-1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x;
    newY = this.currentpos.y-1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x+1;
    newY = this.currentpos.y-1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x-1;
    newY = this.currentpos.y+1;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
    newX = this.currentpos.x+1;
    newY = this.currentpos.y;
    if (newX > 0 && newX <9 && newY >0 && newY < 9) this.moves.push({x:newX,y:newY})
  
    showmoves(this)
   }
}
const pb1 = new Pawn("black","black pawn",1,2,"../media/b_pawn.svg")
const pb2 = new Pawn("black","black pawn",2,2,"../media/b_pawn.svg")
const pb3 = new Pawn("black","black pawn",3,2,"../media/b_pawn.svg")
const pb4 = new Pawn("black","black pawn",4,2,"../media/b_pawn.svg")
const pb5 = new Pawn("black","black pawn",5,2,"../media/b_pawn.svg")
const pb6 = new Pawn("black","black pawn",6,2,"../media/b_pawn.svg")
const pb7 = new Pawn("black","black pawn",7,2,"../media/b_pawn.svg")
const pb8 = new Pawn("black","black pawn",8,2,"../media/b_pawn.svg")
const pb9 = new rook("black","black rook",1,1,"../media/b_rook.svg")
const pb10 = new rook("black","black rook",8,1,"../media/b_rook.svg")
const pb11 = new knight("black","black knight",7,1,"../media/b_knight.svg")
const pb12 = new bishop("black","black bishop",3,1,"../media/b_bishop.svg")
const pb13 = new bishop("black","black bishop",6,1,"../media/b_bishop.svg")
const pb14 = new king("black","black king",5,1,"../media/b_king.svg")
const pb15 = new knight("black","black knight",2,1,"../media/b_knight.svg")
const pb16 = new queen("black","black queen",4,1,"../media/b_queen.svg")



const pw1 = new Pawn("white","white pawn",1,7,"../media/w_pawn.svg")
const pw2 = new Pawn("white","white pawn",2,7,"../media/w_pawn.svg")
const pw3 = new Pawn("white","white pawn",3,7,"../media/w_pawn.svg")
const pw4 = new Pawn("white","white pawn",4,7,"../media/w_pawn.svg")
const pw5 = new Pawn("white","white pawn",5,7,"../media/w_pawn.svg")
const pw6 = new Pawn("white","white pawn",6,7,"../media/w_pawn.svg")
const pw7 = new Pawn("white","white pawn",7,7,"../media/w_pawn.svg")
const pw8 = new Pawn("white","white pawn",8,7,"../media/w_pawn.svg")
const pw9 = new rook("white","white rook",1,8,"../media/w_rook.svg")
const pw10 = new rook("white","white rook",8,8,"../media/w_rook.svg")
const pw11 = new knight("white","white knight",2,8,"../media/w_knight.svg")
const pw12 = new bishop("white","white bishop",3,8,"../media/w_bishop.svg")
const pw13 = new knight("white","white knight",7,8,"../media/w_knight.svg")
const pw14 = new bishop("white","white bishop",6,8,"../media/w_bishop.svg")
const pw15 = new king("white","white king",5,8,"../media/w_king.svg")
const pw16 = new queen("white","white queen",4,8,"../media/w_queen.svg")


const piecesarr = [pb1,pb2,pb3,pb4,pb5,pb6,pb7,pb8,pb9,pb10,pb11,pb12,pb13,pb14,pb15,pb16,pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8,pw9,pw10,pw11,pw12,pw13,pw14,pw15,pw16]
const boxes1 = document.getElementsByClassName('box');

const displayBoard =() => {

  const selectedPiece = piece.selectedPiece;
  const dest =piece.dest;

//   const currentpos = document.querySelector(`div[data-cord = (${selectedPiece.currentpos.x},${selectedPiece.currentpos.y})]`)
//    currentpos = document.removeAttribute("data-name",p.name);
//    currentpos = document.removeAttribute("data-color",p.color);
//   currentpos.firstElementChild.classList.add("hideImg");


//   const validateMove = selectedPiece.moves.filter(e => e.x == dest.x && e.y == dest.y);

//   if(validateMove.length){

//   const destPos = document.querySelector(`div[data-cord]="(${dest.x},${dest.y})`);
//   destPos.setAttribute("data-name",p.name);
//   destPos.setAttribute("data-color",p.color);
//   destPos= document.removeAttribute("data-color",p.color);
//   destPos.firstElementChild.classList.add("hideImg");
//   destPos.firstElementChild.setAttribute("src",selectedPiece.image);

//   if(selectedPiece.name.includes("Pawn")){
//     selectedPiece.initialMove = false;
//   }
//   piece.selectPiece.currentpos.x = piece.dest.x;
//   piece.selectPiece.currentpos.y = piece.dest.y;
//   piece.turn = piece.turn == "white" ? "black":"white";
// }
// else{
//   alert("wrong move");
//   return;
// }
// const currentpos = document.querySelector(`div[data-cords](${selectedPiece.currentpos},${selectedPiece.currentpos})`)


//  }

}
piecesarr.forEach(p => {
  for (const boxes of boxes1){
    if(p.initialpos.x==boxes.dataset.xindex && p.initialpos.y == boxes.dataset.yindex){
      boxes.firstChild.setAttribute("src",p.image);
      boxes.setAttribute("data-name",p.name);
      boxes.setAttribute("data-color",p.color);
      boxes.addEventListener("mouseenter",p.getpossibleMoves)
      boxes.addEventListener("mouseleave",()=> restpossiblemoves(p))
    }
  }
})
for(const boxes of boxes1){
  if (boxes.dataset.name == "" || boxes.dataset.name == null || boxes.dataset.name == undefined) {
    boxes.firstElementChild.classList.add("hideImg");
  }
}
const findDistance =(a,b) =>{
  return Math.sqrt((Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2)));
}
const validateRookMovesArr = (piece) => {
  let current = piece.currentpos;
  let moves = piece.moves;
  moves = moves.sort((a,b) => findDistance(a, current) - findDistance(b,current)) 
  console.log(moves);
  let directions = {
    up: [],
    down: [],
    left: [],
    right: []
  }
  moves.forEach(m =>{
    if(m.y >current.y && m.x == current.x){
      directions.down =[...directions.down, m]
    }
    if(m.y < current.y && m.x == current.x){
      directions.up =[...directions.up, m]
    }
    if(m.y == current.y && m.x > current.x){
      directions.right =[...directions.right, m]
    }
    if(m.y == current.y && m.x < current.x){
      directions.left =[...directions.left, m]
    }
  })
  console.log(directions);
  let newMoves =[];
  for (const dir in directions){
    for (const d of directions[dir]){
      const box1  =document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
      const color =box1.dataset.color;
      
      if(color !="" || color != undefined || color !=null) {
        newMoves.push(d);
        break;
      }
      else{
        newMoves.push(d)
      }
    }
  }
  return newMoves;
}




