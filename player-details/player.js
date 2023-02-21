const mainImg = document.getElementById('main-img')
const imgSub = document.getElementById('img-sub')
const imgP = document.createElement('img')
const teamLogoP = document.getElementById('team-logo-p')
const teamP = document.createElement('img')
const pName = document.getElementById('p-Name')
const pPrice = document.getElementById("p-price")
const pStatus = document.getElementById('p-status') 
const pDescription = document.getElementById('p-desciption')
const logotdP = document.getElementById('logo-td-p')

logotdP.addEventListener('click', (e)=>{
    e.preventDefault()
    location.pathname = `IPL/index.html`;
})

$(function(){
    $.get('../data.json')
    .done(function(data, status){
        for(let x = 0; x<data.length; x++){
            const {id, playerName, from, price, isPlaying, description, img} = data[x]
            if(JSON.parse(localStorage.getItem('1')) == playerName){
                imgP.src = `${img}`;
                pName.innerText = `${playerName}`;
                pPrice.innerText = `Price: ${price}`;
                pDescription.innerText = `Role: ${description}`
                if(isPlaying == true){
                    pStatus.innerText = `Playing`
                } else {
                    pStatus.innerText = `On-bench`
                }
                $(function(){
                    $.get('../team.json')
                    .done(function(team, status){
                        for(let z = 0; z<team.length; z++){
                            if(from == team[z].team){
                                teamP.src = `${team[z].team_logo2}`
                            }
                        }
                    })
                })

                mainImg.appendChild(imgP)
                teamLogoP.appendChild(teamP)
            }
        }
        console.log(status); // for getting the status of get request
    })
    .fail(function () {
        alert('Please wait while we fix this or refresh, an error occured!')
    })
})

for (const [key, value] of Object.entries(localStorage)) {
    let val = JSON.parse(value)
    if(JSON.parse(localStorage.getItem('1')) == `${val.playerName}`){
        imgP.src = `${val.img}`;
        pName.innerText = `${val.playerName}`;
        pPrice.innerText = `Price: ${val.price}`;
        pDescription.innerText = `Role: ${val.description}`
        if(`${val.isPlaying}` == true){
            pStatus.innerText = `Playing`
        } else {
            pStatus.innerText = `On-bench`
        }
        $(function(){
            $.get('../team.json')
            .done(function(team, status){
                for(let z = 0; z<team.length; z++){
                    if(`${val.from}` == team[z].team){
                        teamP.src = `${team[z].team_logo2}`
                    }
                }
                console.log(status); // for getting the status of get request
            })
            .fail(function () {
                alert('Please wait while we fix this or refresh, an error occured!')
            })
        })

        mainImg.appendChild(imgP)
        teamLogoP.appendChild(teamP)
}
}