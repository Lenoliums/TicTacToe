const field = {r1c1: undefined, r1c2: undefined, r1c3: undefined, r2c1: undefined, r2c2: undefined, r2c3: undefined,r3c1: undefined, r3c2: undefined, r3c3: undefined}
let fieldArr=[];
for(let prop in field){
    fieldArr.push(prop);
}

class Player {
    constructor(side, sideName) {
      this.side = side;
      this.sideName=sideName;
    }
    move(cell){
        if (winFlag){
            return
        }
        if(typeof field[cell] === "undefined"){
            field[cell]=this.sideName;
            fieldArr.splice(fieldArr.indexOf(cell), 1);
            let conteriner = document.createElement('div');
            conteriner.classList.add('cont');
            document.getElementById(cell).appendChild(conteriner);
            conteriner.appendChild(this.side.cloneNode(true));
            this.checkWin();
            makeChooseMessage.style.display='none';
            return
        }
    }
    checkWin(){
        if((field["r1c1"]==field["r2c1"] && field["r1c1"]==field["r3c1"] && field["r1c1"] == this.sideName)||
            (field["r1c2"]==field["r2c2"] && field["r1c2"]==field["r3c2"] && field["r1c2"] == this.sideName)||
            (field["r1c3"]==field["r2c3"] && field["r1c3"]==field["r3c3"]&& field["r1c3"] == this.sideName)||
            (field["r2c1"]==field["r2c2"] && field["r2c1"]==field["r2c3"] && field["r2c1"] == this.sideName)||
            (field["r1c1"]==field["r1c2"] && field["r1c1"]==field["r1c3"] && field["r1c1"] == this.sideName)||
            (field["r3c1"]==field["r3c2"] && field["r3c1"]==field["r3c3"]&& field["r3c3"] == this.sideName)||
            (field["r1c1"]==field["r2c2"] && field["r1c1"]==field["r3c3"]&& field["r3c3"] == this.sideName)||
            (field["r1c3"]==field["r2c2"] && field["r2c2"]==field["r3c1"]&& field["r3c1"] == this.sideName)){
                winFlag='true';
                setTimeout(()=>alert(this.sideName + " win"), 100);
                setTimeout(()=>this.newGamePrep(), 500);
                return 
        }
        if(fieldArr.length==0){
            winFlag=true;
            setTimeout(() => alert('draw'), 100);
            setTimeout(()=>this.newGamePrep(), 500);  
            return
        }
        return
    }
    newGamePrep(){
        winFlag=false;
        fieldArr=[];
        for (var prop in field) {
            fieldArr.push(prop)
            field[prop]=undefined;
        }
        let tds = document.getElementsByTagName('td');
        for (const element of tds) {
            let childrens=element.childNodes
            if (childrens.length!=0)
                childrens[childrens.length-1].remove();
        }
        makeChooseMessage.style.display='block';
    }
}

let tac = document.getElementsByClassName('tac')[0];
let tic = document.getElementsByClassName('tic')[0]
winFlag=false;
Player1=new Player(tic, 'tic');
PlayerBot = new Player(tac, 'tac');

async function makeMove(id){
    if(fieldArr.indexOf(id)!=-1){
        Player1.move(id);
        PlayerBot.move(RandomMove());
    }
}

function ChooseTurn(side, sideName, anSide,  anSideName){
    if(fieldArr.length==9){
        Player1.side=side; 
        Player1.sideName=sideName;
        PlayerBot.side=anSide;
        PlayerBot.sideName=anSideName;
        if(sideName=='tac'){
            document.getElementById("chooseTac").style.display="block";
            document.getElementById("chooseTic").style.display="none";
            PlayerBot.move(RandomMove());
        }
        else{
            document.getElementById("chooseTic").style.display="block";
            document.getElementById("chooseTac").style.display="none";
        }
    }
}

function RandomMove(){
    rand=Math.floor(Math.random() * fieldArr.length)
    return fieldArr[rand];
}

