export default function(language = 'fr', action){

    if(action.type == 'changeLanguage'){
        return action.language
    } else {
        return language
    }
}