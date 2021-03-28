export function getByAuthor(autor){
    return fetch(`https://openlibrary.org/search.json?author=${autor}`)
}
export function getByISBN(code){
    return fetch(`https://openlibrary.org/isbn/${code}.json`)
}