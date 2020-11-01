const WALL = '#';
const TARGET = '.';
const PERSON = '@';
const BOX = '$';
const BOX_ON_TARGET = '*';
const PERSON_ON_TARGET = '+';
const PATH = ' ';
let games= [];
let currentGame = 0;
function loadRandomGame(){
    currentGame = loadGame();
   // console.log(currentGame);
    document.getElementById('level').innerHTML = currentGame.level;
    document.getElementById('Author').innerHTML = currentGame.author;
    let markup = '<table>';
    let rows = currentGame.height;
    console.log(rows);
    let columns = currentGame.mawWidth;
    console.log(columns);
    let width = Math.floor(window.innerwight - 100) / columns;
    let heigh = window.innerHeight > 600 ? window.innerHeight - 300: window.innerHeight -100;
    while(width * rows > heigh){
        width = width - 20;
    }

    for(let row = 0 ; row < rows; row++){
        markup += createRow(width, row, columns, currentGame);
    }

    markup +='</table>';
    document.getElementById('board').innerHTML = markup;
   
}
function renderGame(currentGame){
    
}
function loadGame(){
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
        data.forEach(element => {
            if (element.length > max ) max = element.length;
        });
       // console.log(data);
        
        games.push({
            author: 'Roger Delaporte',
            level: rawData[currentIndex +1].split('\n')[0],
            height: data.length,
            mawWidth: max,
            data: data,
        });
        currentIndex++;
    }
    //games.push(game);
    const gameNo = Math.floor(Math.random() *(games.length - 1));
    return games[gameNo];
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