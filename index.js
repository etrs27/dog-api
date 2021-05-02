const getDogImages = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
    .then(response=> response.json())
    .then(responseJson => displayDogs(responseJson) )
    .catch(error => console.log('Sorry! An error has occurred.'))
}


const displayDogs = (responseJson) => {
    let breed = $('#breed').val();

    for (let i=0; i<responseJson.message.length; i++){
        if (responseJson.status === "error") {
            $('.dog-image').empty() && $('.error-container').empty();
            $('.error-container').prepend('Not a breed of a dog. Please try again.');
        }
        else {
            $('.dog-image').append(
                `<img src=${responseJson.message[i]} alt="Picture of a ${breed} breed dog">`
            )
        }
    }
}


const getBreed = () => {
    $('main').on('submit', event => {
        event.preventDefault();
        
        let breed = $('#breed').val();
        const letters = /^[A-Za-z]+$/;
        const clearField = $('.dog-image').empty() && $('.error-container').empty();

        if (breed.match(letters)) {
            clearField;
            getDogImages(breed);
        }
        else {
            clearField;
            $('.error-container').prepend('Please input alphabet characters only.');
        }
    })
}


const main = () => {
    getBreed();
}


$(main);