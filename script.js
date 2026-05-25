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


    if(word !== lastSearchedWord){
        lastSearchedWord = word;
        resultDiv.textContent= 'Searching....';
    

    try{
        const translateResponse = await fetch(`${translateApiurl}?q=${encodeURIComponent(word)}&langpair=en|${targetLanguage}`);

        if(!translateResponse.ok){
            throw new Error(`HTTP error! status: ${translateResponse.status}`);

        }



        const translateData = await translateResponse.json();


        const dictionaryResponse =  await fetch(dictionaryAPIurl + encodeURIComponent(word));
        let dictionaryData = [];

        if(dictionaryResponse.ok){
            dictionaryData = await dictionaryResponse.json();
        }

        let result = `word/phrase: ${word}\n`;
        result += `Translation (${getLanguageName(targetLanguage)}): ${translateData.responseData.translatedText}\n\n `;



        if(dictionaryData && dictionaryData.length > 0){
          
            dictionaryData[0].meanings.forEach((meaning, index) => {
                result += `Meaning${index + 1} (${meaning.partOfSpeech}):\n`; 
                meaning.definitions.forEach((def, defIndex) => {
                    result += `${defIndex + 1}. ${def.definition}\n`;
                    if(def.example){
                        result += ` Example: ${def.example}\n`;
                    }


                });
                result += '\n';
                 
            });
        }else{
            result += 'No additional definitions found on this word.\n';
        }
        resultDiv.textContent = result;
    }
    catch(error){
        console.error('Error:', error);
        resultDiv.textContent =`An error occured: ${error.message}`;
    }   

}else{
        location.reload();
    }
   


}

