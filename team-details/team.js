const mainContainer = document.getElementById("main-t");
const playerContainer = document.createElement('div');
const logoTd = document.getElementById('logo-td');

logoTd.addEventListener('click', (e)=>{
    e.preventDefault()
    location.pathname = 'IPL/index.html'
})

function getInitialTodoList() {
    const req = new XMLHttpRequest()
    
      req.open('get', '../team.json', true)
    
      req.onreadystatechange = function () {
      
        if (this.readyState === 4) {
          if (this.status == 200) {
            const data = JSON.parse(this.responseText)
            for(let x = 0; x<data.length; x++){

                if(localStorage.getItem('0') == data[x].id){
                    const nameLogo = document.createElement('div');
                    const nameT = document.createElement('h3');
                    const logoT = document.createElement('img');
                    const trophyContainer = document.createElement('div');
                    const trophyImg = document.createElement('img');
                    const trophy = document.createElement('div');
                    const playerCount = document.createElement('div');
                    const topBatsman = document.createElement('ol');
                    const tbSub = document.createElement('h3')
                    const topBowler = document.createElement('ol');
                    const tblSub = document.createElement('h3')
                    const olContainer = document.createElement('div')

                    nameLogo.classList = `name-logo-td`
                    nameT.innerText = `${data[x].team_name}`;
                    logoT.classList = `logo-teams`;
                    logoT.src = `${data[x].team_logo}`;
                    trophyContainer.classList = "trophy-container";
                    trophyContainer.innerText = `Championship Won:`
                    trophyImg.classList = "trophy-img";
                    trophyImg.src = `https://www.freeiconspng.com/thumbs/trophy-png/trophy-png-23.png`;
                    trophy.innerText = `${data[x].champion_won}`;
                    playerCount.classList = `player-count-td`
                    playerCount.innerText = `Player Count: ${data[x].player_count}`;
                    topBatsman.classList = 'tb';
                    tbSub.innerText = `Top Batsman:`;
                    topBowler.classList = 'tbl';
                    tblSub.innerText = `Top Bowler:`;
                    olContainer.classList = `ol-container`;

                    nameLogo.appendChild(nameT);
                    nameLogo.appendChild(logoT);
                    mainContainer.appendChild(nameLogo);
                    mainContainer.appendChild(trophyContainer);
                    trophyContainer.appendChild(trophyImg);
                    trophyContainer.appendChild(trophy);
                    mainContainer.appendChild(playerCount);
                    topBatsman.append(tbSub);
                    olContainer.appendChild(topBatsman);
                    topBowler.append(tblSub);
                    olContainer.appendChild(topBowler);
                    mainContainer.append(olContainer);

                    for(let z = 0; z<data[x]['top_batsman'].length; z++){
                        const tb = document.createElement('li');
                        tb.innerText = `${data[x]['top_batsman'][z]}`;
                        topBatsman.append(tb);
                    }  
                    for(let z = 0; z<data[x]['top_bowler'].length; z++){
                        const tbl = document.createElement('li');
                        tbl.innerText = `${data[x]['top_bowler'][z]}`;
                        topBowler.append(tbl);
                    }  

                    $(function(){
                        $.get('../data.json')
                        .done(function(player, status){

                            for(let i = 0; i<player.length; i++){
                                const {id, playerName, from, price, isPlaying, description, img} = player[i]
                                if(from == data[x].team){
                                    const playerSubContainer = document.createElement('div');
                                    const nameLogoP = document.createElement('div')
                                    const playerImg = document.createElement('img');
                                    const playerN = document.createElement('h3');
                                    const playerTeam = document.createElement('img');
                                    const playerPrice = document.createElement('div');
                                    const playerStatus = document.createElement('div');
                                    const playerRole = document.createElement('div');

                                    playerContainer.classList = 'player-container';
                                    playerSubContainer.classList = 'player-card';
                                    playerImg.classList = 'player-img';
                                    playerImg.src = `${img}`
                                    nameLogoP.classList = 'name-logo-P'
                                    playerN.innerText = `${playerName}`;
                                    playerTeam.classList = 'logo-players';
                                    playerTeam.src = `${data[x].team_logo}`;
                                    playerPrice.innerText = `Price: ${price}`
                                    playerRole.innerText = `Role: ${description}`;
                                    if(isPlaying){
                                        playerStatus.innerText = `Playing`
                                    } else {
                                        playerStatus.innerText = `On-bench`
                                    }

                                    playerSubContainer.appendChild(playerImg)
                                    nameLogoP.appendChild(playerN)
                                    nameLogoP.appendChild(playerTeam)
                                    playerSubContainer.appendChild(nameLogoP)
                                    playerSubContainer.appendChild(playerPrice)
                                    playerSubContainer.appendChild(playerRole)
                                    playerSubContainer.appendChild(playerStatus)
                                    playerContainer.appendChild(playerSubContainer)
                                    mainContainer.appendChild(playerContainer)

                                    playerSubContainer.addEventListener('click', (e)=>{
                                        e.preventDefault()
                                        location.pathname = "IPL/player-details/player.html"
                                        localStorage.setItem('1', JSON.stringify(`${playerName}`))
                                    })
                                }
                            }
                        })
                    })
                    for (const [key, value] of Object.entries(localStorage)) {
                        let val = JSON.parse(value)
                        if(val.from == data[x].team){
                            const playerSubContainer = document.createElement('div');
                            const nameLogoP = document.createElement('div')
                            const playerImg = document.createElement('img');
                            const playerN = document.createElement('h3');
                            const playerTeam = document.createElement('img');
                            const playerPrice = document.createElement('div');
                            const playerStatus = document.createElement('div');
                            const playerRole = document.createElement('div');

                            playerContainer.classList = 'player-container';
                            playerSubContainer.classList = 'player-card';
                            playerImg.classList = 'player-img';
                            playerImg.src = `${val.img}`;
                            playerImg.setAttribute('alt','Player-Image')
                            nameLogoP.classList = 'name-logo-P'
                            playerN.innerText = `${val.playerName}`;
                            playerTeam.classList = 'logo-players';
                            playerTeam.src = `${data[x].team_logo}`;
                            playerPrice.innerText = `Price: ${val.price}`
                            playerRole.innerText = `Role: ${val.description}`;
                            if(val.isPlaying){
                                playerStatus.innerText = `Playing`
                            } else {
                                playerStatus.innerText = `On-bench`
                            }

                            playerSubContainer.appendChild(playerImg)
                            nameLogoP.appendChild(playerN)
                            nameLogoP.appendChild(playerTeam)
                            playerSubContainer.appendChild(nameLogoP)
                            playerSubContainer.appendChild(playerPrice)
                            playerSubContainer.appendChild(playerRole)
                            playerSubContainer.appendChild(playerStatus)
                            playerContainer.appendChild(playerSubContainer)
                            mainContainer.appendChild(playerContainer)

                            playerSubContainer.addEventListener('click', (e)=>{
                                e.preventDefault()
                                location.pathname = "/player-details/player.html"
                                localStorage.setItem('1', JSON.stringify(`${val.playerName}`))
                            })
                        }
                    }
                }
            }
          } else {
            console.log('Error:', this.status)
          } 
        }
      }
      req.send()
  }
  getInitialTodoList()


