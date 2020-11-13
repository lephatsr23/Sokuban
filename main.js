const WALL = '#';
const TARGET = '.';
const PERSON = '@';
const BOX = '$';
const BOX_ON_TARGET = '*';
const PERSON_ON_TARGET = '+';
const PATH = ' ';

let currentGame;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
let gameLoaded = false;

function loadRandomGame(){
    currentGame = loadGame();
    console.log(currentGame);
   renderGame(currentGame);
}

function renderGame(currentGame){
    if(!currentGame|| !gameLoaded) return;
    document.getElementById('result').style.display = 'none';
    document.getElementById('result_text').innerText = "";
    document.getElementById('level').innerHTML = currentGame.level;
    document.getElementById('Author').innerHTML = currentGame.author;
    let markup = '<table>';
    let rows = currentGame.height;
    //console.log(rows);
    let columns = currentGame.mawWidth;
   // console.log(columns);
    let Width = Math.floor(window.innerWidth - 100) / columns;
    let height = window.innerHeight > 600 ? window.innerHeight - 300: window.innerHeight - 100;
    while(Width * rows > height){
        Width = Width - 10;
    }

    for(let row = 0 ; row < rows; row++){
        markup += createRow(Width, row, columns, currentGame);
    }

    markup +='</table>';
    document.getElementById('board').innerHTML = markup;
    
    if( 
        window.innerHeight < 800 || window.innerWidth < 800 ||  navigator.userAgent.match(/(iPod|iPhone|iPad)/)||/Android|WebOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
    ){
        document.getElementById('control').style.display= '';
        if( window.innerWidth > window.innerHeight){
           
            document.getElementById('control').style.position = 'absolute';
            document.getElementById('control').style.left = '10px';
            document.getElementById('control').style.top = '100px';
            document.getElementById('control').style.zIndex = 50;
            document.getElementById('board').style.marginLeft = '100px';
        }
        else {
           
            document.getElementById('control').style.position = 'absolute';
            document.getElementById('control').style.left = '110px';
            document.getElementById('control').style.top = '400px';
            document.getElementById('control').style.zIndex = 50;
            document.getElementById('board').style.marginLeft = '0px';
                    
        }
    }
}
function loadGame(){
   //if( !gameLoaded == false) return;

   let games= [];
    let  rawData = board[0].split(';');
    const len = rawData.length;
    let game = [];
    let currentIndex = 0;
    while( currentIndex + 1 < len){
        //console.log(rawData[currentIndex]);
        let data = rawData[currentIndex].split('\n').filter((d) => d !== '');
       // console.log(data);
        let max = 0 ;
        data.shift();
        let targets = 0;
        let boxs = 0;
        let personColumn = 0;
        let personRow = 0;
        let boxs_on_target=0;
        let currentRow = 0;
        data.forEach(element => {
            if (element.length > max ) max = element.length;
            targets += element.split(TARGET).length - 1;
            targets += element.split(BOX_ON_TARGET).length - 1;
            targets += element.split(PERSON_ON_TARGET).length - 1;

            boxs += element.split(BOX).length - 1;
            boxs += element.split(BOX_ON_TARGET).length - 1;
            boxs_on_target += element.split(BOX_ON_TARGET).length - 1;
            let i = element.indexOf(PERSON);
            if(i <= 0){
                i = element.indexOf(PERSON_ON_TARGET);
            }
            if(i >= 0){
                personColumn = i;
                personRow = currentRow;
            }
            currentRow++;
        });
       // console.log(data);
        
        games.push({
            author: 'Roger Delaporte',
            level: rawData[currentIndex +1].split('\n')[0],
            height: data.length,
            mawWidth: max,
            data: data,
            Boxs: boxs,
            Targets: targets,
            boxs_on_target:boxs_on_target,
            PersonColumn: personColumn,
            PersonRow: personRow
        });
        currentIndex++;
    }
    //games.push(game);
    const gameNo = Math.floor(Math.random() *(games.length - 1));
    gameLoaded = true;
    return games[32];
}

function createRow(width, row, columns, currentGame){
    if (columns < 1 ) return '';
    //console.log(currentGame.data[row][1]);
    let hitwall = false;
    let markup = `<tr>`;
    for (let col = 0 ; col < columns; col++){
        markup+= `<td style = "width: ${width}px; height:${width}px;">`
        
        switch(currentGame.data[row][col] )
        {
            case WALL:
                hitwall = true;
                markup += `<img src="./wall.png" width="${width}px;" height="${width}px;">`;
                break;
            case PERSON:
                markup += `<img src="./person.png" width="${width}px;" height="${width}px;">`;
                break;
            case BOX:
                markup += `<img src="./box0.png" width="${width}px;" height="${width}px;">`;
                break;
            case BOX_ON_TARGET:
                markup += `<img src="./box1.png" width="${width}px;" height="${width}px;">`; 
                break;
            case PERSON_ON_TARGET:
                    markup += `<img src="./person.png" width="${width}px;" height="${width}px;">`; 
                    break;
            case PATH:
                if(hitwall){
                    markup += `<img src="./path.png" width="${width}px;" height="${width}px;">`; 
                }
                break;   
            case TARGET:
                markup += `<img src="./target.png" width="${width}px;" height="${width}px;">`; 
                break;                                    
        }
        //markup += "hello";
        markup += '</td>';
    }
    markup += '</tr>';
    return markup;
}

document.onkeydown = function(e){
   
    if(!gameLoaded || !currentGame) return ;
    console.log(e.keyCode);
    switch(e.keyCode){
        case 38:
            console.log('UP');
            doMove(UP);
            break;
        case 40:
            console.log('DOWN');
            doMove(DOWN);
            break;
        case 37:
            console.log('LEFT');
            doMove(LEFT);
            break; 
        case 39:
            console.log('RIGHT');
            doMove(RIGHT);
            break;
                 
    }

}
function doMove(director){
    console.log("doMove");
    if(!currentGame || !gameLoaded) return;
    let x0 = currentGame.PersonColumn;
    let y0 = currentGame.PersonRow;
    let x1 =0;
    let y1 = 0;

    console.log("person ", x0, y0);
    switch(director){
        case UP:
            y1--;
            break;
        case DOWN:
            y1++; 
            break;   
        case LEFT:
            x1--; 
            break;  
        case RIGHT:
            x1++; 
             break;                              
    }
    if(
        currentGame.data[y0+y1][x0 + x1] === TARGET || 
        currentGame.data[y0+y1][x0 + x1] === PATH
    )
    {
        currentGame.data[y0] = currentGame.data[y0].substr(0, x0) +
        (currentGame.data[y0][x0] === PERSON_ON_TARGET ? TARGET : PATH)+
        currentGame.data[y0].substr(x0 + 1);

        currentGame.data[y0+y1] = currentGame.data[y0+y1].substr(0, x0+ x1) +
        (currentGame.data[y0+y1][x0+x1] === TARGET  ? PERSON_ON_TARGET : PERSON )+
        currentGame.data[y0+y1].substr(x0+ x1 +1);

        currentGame.PersonColumn = x0 + x1;
        currentGame.PersonRow = y0 + y1;
        //console.log(currentGame.data);
        renderGame(currentGame);
    }
    else if(
        currentGame.data[y0+y1][x0 + x1] === BOX || 
        currentGame.data[y0+y1][x0 + x1] === BOX_ON_TARGET
    ){
        if(
            currentGame.data[y0+y1*2][x0 + x1*2] === TARGET || 
            currentGame.data[y0+y1*2][x0 + x1*2] === PATH
        )
        {
            if(currentGame.data[y0+y1 *2][x0+x1*2] === TARGET)
            {
                currentGame.boxs_on_target++;
            }
            if(currentGame.data[y0+y1][x0+x1] === BOX_ON_TARGET)
            {
                currentGame.boxs_on_target--;
            }
         
            currentGame.data[y0] = currentGame.data[y0].substr(0, x0) +
            (currentGame.data[y0][x0] === PERSON_ON_TARGET ? TARGET : PATH)+
            currentGame.data[y0].substr(x0 + 1);
    
            currentGame.data[y0+y1] = currentGame.data[y0+y1].substr(0, x0 + x1) +
            (currentGame.data[y0+y1][x0+x1] === BOX_ON_TARGET  ? PERSON_ON_TARGET : PERSON )+
            currentGame.data[y0+y1].substr(x0+ x1 +1);
    
            currentGame.data[y0+ y1 * 2] = currentGame.data[y0+ y1 * 2].substr(0, x0+x1*2 ) +
            (currentGame.data[y0+y1 *2][x0+x1*2] === TARGET ? BOX_ON_TARGET : BOX)+
            currentGame.data[y0+ y1 * 2].substr(x0 +x1*2 + 1);

            currentGame.PersonColumn = x0 + x1;
            currentGame.PersonRow = y0 + y1;
            //console.log(currentGame);
            renderGame(currentGame);
            if(currentGame.boxs_on_target === currentGame.Boxs){
                console.log('solved !');
                document.getElementById('result').style.display = 'block';
                console.log(document.getElementById('result').style.display);
                document.getElementById('result_text').innerText = "Chúc mừng bạn đã thắng";
                console.log("251");
            }    

        }
    }


    
}