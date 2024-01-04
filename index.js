const field = {r1c1: undefined, r1c2: undefined, r1c3: undefined, r2c1: undefined, r2c2: undefined, r2c3: undefined,r3c1: undefined, r3c2: undefined, r3c3: undefined}
let fieldArr=[]
for(let prop in field){
    fieldArr.push(prop)
}

let tac = document.createElement('div');
tac.classList.add("tac");


let tic = document.createElement('div');
tic.classList.add("tic");

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
            document.getElementById(cell).appendChild(this.side.cloneNode(true));
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
        document.getElementById("chooseTac").style.display="none";
        document.getElementById("chooseTic").style.display="none";

    }
}
winFlag=false;
Player1=new Player(tic, 'tic');
PlayerBot = new Player(tac, 'tac');

async function makeMove(id){
    if(fieldArr.indexOf(id)!=-1){
        Player1.move(id);
        PlayerBot.move(RandomMove());
    }
}
let makeChooseMessage = document.createElement('span');
makeChooseMessage.innerHTML="You can choose your side"
makeChooseMessage.id="makeChooseMessage"
document.body.append(makeChooseMessage);

tac.onclick=function(){ChooseTurn(tac, 'tac', tic, 'tic')};
document.body.append(tac);
let chooseTac = document.createElement('span');
chooseTac.innerHTML="Tac chosen"
chooseTac.id="chooseTac"
chooseTac.style.display='none'
document.body.append(chooseTac);

tic.onclick=function(){ChooseTurn(tic, 'tic', tac, 'tac')};
document.body.append(tic);
let chooseTic = document.createElement('span');
chooseTic.innerHTML="Tic chosen"
chooseTic.id="chooseTic"
chooseTic.style.display='none'
document.body.append(chooseTic);

function ChooseTurn(side, sideName, anSide,  anSideName){
    if(fieldArr.length==9){
        Player1.side=side; 
        Player1.sideName=sideName;
        PlayerBot.side=anSide;
        PlayerBot.sideName=anSideName;
        if(sideName=='tac'){
            PlayerBot.move(RandomMove());
            document.getElementById("chooseTac").style.display="block";
            document.getElementById("chooseTic").style.display="none";
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

