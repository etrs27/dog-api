const getDogImage = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
    .then(response=> response.json())
    .then(responseJson => displayDogs(responseJson) )
    .catch(error => console.log('Sorry! An error has occurred.'))
}


const displayDogs = (responseJson) => {
    let breed = $('#breed').val();

    for (let i=0; i<responseJson.message.length; i++){
        $('.dog-image').append(
            `<img src=${responseJson.message[i]} alt="Picture of a ${breed} breed dog">`
        )
    }
}


const getNumber = () => {
    $('main').on('submit', event => {
        event.preventDefault();
        let breed = $('#breed').val();

        if (typeof breed !== 'string'){
            
        }
        getDogImage(breed)
        console.log(breed)
    })
}


const main = () => {
    getNumber();
    console.log('App is live!')
}


$(main);