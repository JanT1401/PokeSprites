const searchbar = document.getElementById('searchbar');
const spriteContainer = document.getElementById('spriteContainer');
const spriteCount = document.getElementById('spriteCount');
const suggestionContainer = document.getElementById('suggestionContainer');

function searchPokemon(){
    let fileIndex = 0;
    spriteContainer.innerHTML = '';
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchbar.value.toLowerCase()}`)
        .then(response => response.json())
        .then(data => 
            Object.values(data.sprites).forEach(sprite => {
                if(typeof(sprite) === 'string'){
                    let makeLink = document.createElement('a');
                    makeLink.download = `${searchbar.value}${fileIndex}.png`;
                    makeLink.href = sprite;
                    makeLink.target = '_blank';
                    let makeSprite = document.createElement('img');
                    makeSprite.src = sprite;
                    spriteContainer.appendChild(makeLink);
                    makeLink.appendChild(makeSprite);
                    spriteCount.textContent = spriteContainer.childElementCount;
                    fileIndex++;
                }
            })
        )
        .catch(err => alert(`Given Pokemon doesn\'t exist!\nError: ${err}`));
}

function suggestSearch(){
    console.clear();
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(res => res.json())
        .then(data => {
            if(searchbar.value !== '' && searchbar.value !== ' '){
                suggestionContainer.style.visibility = 'visible';
                suggestionContainer.innerHTML = '';
                searchbar.style.borderRadius = '0px 0px 24px 24px';
                data.results.forEach(pok => {
                    if(pok.name.includes(searchbar.value.toLowerCase())){
                        let newSuggestion = document.createElement('p');
                        newSuggestion.classList.add('suggestion');
                        newSuggestion.textContent = pok.name;

                        suggestionContainer.appendChild(newSuggestion);

                        newSuggestion.onclick = () => {
                            searchbar.value = newSuggestion.textContent;
                            searchbar.style.borderRadius = '24px';
                            suggestionContainer.innerHTML = '';
                            suggestionContainer.style.visibility = 'hidden';
                            submitPokemon()
                        }
                    }
                })
            }
        })
        .catch(err => alert(err));
}

function submitPokemon(){
    spriteCount.textContent = spriteContainer.childElementCount;
    searchPokemon();
}

addEventListener('keypress', e => {
    if(e.keyCode === 13){
        submitPokemon();
    }
})
