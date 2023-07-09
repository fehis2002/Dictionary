const setup = () => {
    
    let button = document.getElementById('submitButton');

    button.addEventListener('click', () => {
        //clearing word
        for(let child of document.getElementById('content').children) {
            child.textContent = '';
        }
        //displaying searched word
        displayWord();
    });
}


const searchWord = async word => {

    try {
        let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
        let data = await response.json();
        return data[0]
    } catch (e) {
        console.log(e);
    }
}

const displayWord = async () => {

    let word = document.getElementById('word');
    let phonetic = document.getElementById('phonetic');
    let definition = document.getElementById('definition');

    let data = await searchWord(document.getElementById('input').value);

    //displaying word
    word.textContent = data.word

    //displaying phonetic
    let i = 0;
    while(i < data.phonetics.length) {
        if(data.phonetics[i].text && data.phonetics[i].audio) {
            phonetic.textContent = data.phonetics[i].text;
            phonetic.addEventListener('click', () => {
                playPhoneticAudio(i);
            });
            break;
        }
        i++;
    }

    //displaying definitions
    for(let meaning of data.meanings) {
        let span = document.createElement('span');
        let partOfSpeech = document.createTextNode(meaning.partOfSpeech);
        let definitionText = document.createTextNode(meaning.definitions[Math.floor(Math.random() * meaning.definitions.length)].definition);

        span.appendChild(partOfSpeech);
        definition.appendChild(span);
        definition.appendChild(document.createElement('br'));
        definition.appendChild(definitionText);
        definition.appendChild(document.createElement('br'));

        span.classList.add('partOfSpeech')
    }

}

const playPhoneticAudio = async (index) => {

    let data = await searchWord(document.getElementById('input').value);
    await new Audio(data.phonetics[index].audio).play();
}

window.addEventListener('load', setup);