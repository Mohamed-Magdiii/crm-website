export function captilazeFirstLetter(word){
    
  const firstLetterCaptilaziedWord = word.charAt(0).toUpperCase() + word.slice(1);
  return firstLetterCaptilaziedWord;
}
export function displaySubString(word){
  let subString = "";
  for (let i = 0; i < 4; i++){
    subString += word[i];
  }
  return subString;
}