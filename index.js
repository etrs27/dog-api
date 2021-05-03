const getDogImages = (breed) => {
    let subBreed = breed.split(/(\s+)/);
    let breedOf = subBreed[0];
    let sub = subBreed[2];

    if (sub === undefined){
        link = `https://dog.ceo/api/breed/${breedOf}/images/random/5`
    }
    else {
        link = `https://dog.ceo/api/breed/${breedOf}/${sub}/images/random/5`
    }

    fetch(link)
    .then(response=> response.json())
    .then(responseJson => displayDogs(responseJson) )
    .catch(error => console.log('Sorry! An error has occurred.'))
}

const displayDogs = (responseJson) => {
    let breed = $('#breed').val().charAt(0).toUpperCase() + $('#breed').val().slice(1);

    for (let i=0; i<responseJson.message.length; i++){
        if (responseJson.status === "error") {
            $('.dog-image').empty() && $('.error-container').empty();
            $('.error-container').prepend(`${breed} is not a breed of a dog. Please try again.`);
        }
        else {
            $('.dog-image').append(
                `<img src=${responseJson.message[i]} alt="Picture of a ${breed} dog">`
            )
        }
    }
    
    $('#breed-type').empty().prepend(`${breed}`.toUpperCase());
    $('#form-container').children('input:not(#submit)').val('');
}

const getBreed = () => {
    $('main').on('submit', event => {
        event.preventDefault();
        
        let breed = $('#breed').val();
        const letters = /^[a-z][a-z\s]*$/;
        const clearField = $('.dog-image').empty() && $('.error-container').empty() && $('#breed-type').empty();

        if (breed.match(letters)) {
            getDogImages(breed);
            clearField;
        }
        else {
            $('.error-container').prepend('Please input alphabetical characters only.');
            $('#form-container').children('input:not(#submit)').val('');
            clearField;
        }
    })
}

const main = () => {
    getBreed();
}


$(main);