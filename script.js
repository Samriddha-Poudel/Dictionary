const dictionaryAPIurl=`https://api.dictionaryapi.dev/api/v2/entries/en/`;
const translateApiurl='https://api.mymemory.translated.net/get';

let lastSearchedWord='';

async function searchwords(){


    const wordInput = document.getElementById('wordinput');
    const languageSelect= document.getElementById('language-select');
    const resultDiv = document.getElementById('result');
    const word = wordInput.value.trim();
    const targetLanguage = languageSelect.value;


    if(!word){
        resultDiv.textContent = 'Please enter a word or sentence';
        return;
    }

}