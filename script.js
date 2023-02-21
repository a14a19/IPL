const teamsM = document.getElementById('teams-m');
const search = document.getElementById('search');
const searchResult = document.getElementById('search-result');
const addBtn = document.getElementById('add-btn')
const closebtn = document.getElementById('close-form')
const playerForm = document.getElementById('player-form')
const pName = document.getElementById('pName')
const pTeamS = document.getElementById('p-team')
const pPrice = document.getElementById('pPrice')
const playing = document.getElementById('playing')
const ob = document.getElementById('ob')
const description = document.getElementById('description')
const imgPlayer = document.getElementById('img-player')
const submit = document.getElementById('submit')

search.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter' && search.value === ""){
        alert("Please enter valid input!")
    }
})

$(function(){
    $.get('team.json')
    .done(function(data, status){
        for(let x = 0; x<data.length; x++){
            const mainDiv = document.createElement('a')
            const imgT = document.createElement('img')
            const nameT = document.createElement('div')

            imgT.classList = `imgTeams`;
            imgT.src = `${data[x].team_logo2}`;
            mainDiv.classList = `team-sub-container`;

            mainDiv.addEventListener('click', (e)=>{
                e.preventDefault();
                location.pathname = 'IPL/team-details/team.html';
                console.log([x] == data[x].id);
                localStorage.setItem('0', `${x}`);
            })

            mainDiv.appendChild(imgT);
            teamsM.appendChild(mainDiv);
        }
        console.log(status); // for getting the status of get request
    })
    .fail(function () {
        alert('Please wait while we fix this or refresh, an error occured!')
    })
})

$(function(){
    $.get('data.json')
    .done(function(player, status){
        for(let z = 0; z<player.length; z++){
            search.addEventListener('keypress', (e)=>{
                if(e.key === 'Enter'){

                    const input = search.value.toUpperCase()
                    const teamShortName = player[z].from.toUpperCase()
                    const searchVal1 = teamShortName.search(input);

                    if(searchVal1 >= 0){
                        const subSearch = document.createElement('div')
                        searchResult.appendChild(subSearch)
                        subSearch.innerText = `${player[z].playerName} (${player[z].from})`;
                        subSearch.classList = 'sub-search';

                        search.addEventListener('blur', (e)=>{
                            setTimeout(function(){
                                search.value = '';
                                searchResult.removeChild(subSearch);
                            }, 1000)
                        })

                        subSearch.addEventListener('click', (e)=>{
                            e.preventDefault()
                            location.pathname = "/player-details/player.html"
                            localStorage.setItem('1', JSON.stringify(`${player[z].playerName}`))
                        })

                    }
                }
            })
        }
        console.log(status); // for getting the status of get request
    })
    .fail(function () {
        alert('Please wait while we fix this or refresh, an error occured!')
    })
})

addBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    playerForm.classList.toggle('dis-none');
})
closebtn.addEventListener('click', (e)=>{
    e.preventDefault()
    playerForm.classList.toggle('dis-none');
})

let mObj = new Object();
let id = 0
let isPlaying;
submit.addEventListener('click', (e)=>{
    e.preventDefault()
    if(playing.checked){
        isPlaying = true
    }else if(ob.checked){
        isPlaying = false
    }
    if(pName.value == '' || pPrice.value == '' || pTeamS.value == 'None' || description.value == '' ){
        alert("Please enter valid  input!")
    }
    mObj = {
        "id": ++id,
        "playerName": pName.value.trim(),
        "from": pTeamS.value,
        "price": pPrice.value.trim(),
        "isPlaying": isPlaying,
        "description": description.value.trim(),
        "img": imgPlayer.value.trim()
    }
    localStorage.setItem(`${pName.value}`, JSON.stringify(mObj))
    pName.value = '';
    pTeamS.value = 'None';
    pPrice.value = '';
    description.value = '';
    playing.checked = false;
    ob.checked = false;
    playerForm.classList.toggle('dis-none');
})

for (const [key, value] of Object.entries(localStorage)) {
    let val = JSON.parse(value)
    search.addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){
            const input = search.value.toUpperCase();
            const teamShortName = val.from.toUpperCase();
            const searchVal1 = teamShortName.search(input);

            if(searchVal1 >= 0){
                const subSearch = document.createElement('div')
                searchResult.appendChild(subSearch)
                subSearch.innerText = `${val.playerName} (${val.from})`
                subSearch.classList = 'sub-search'

                subSearch.addEventListener('click', (e)=>{
                    e.preventDefault()
                    location.pathname = "/player-details/player.html"
                    localStorage.setItem('1', JSON.stringify(`${val.playerName}`))
                })

                search.addEventListener('blur', (e)=>{
                    setTimeout(function(){
                        search.value = '';
                        searchResult.removeChild(subSearch);
                    }, 1000)
                })
            }
        }
    })
}
