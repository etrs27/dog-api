const getDogImages = (breed) => {
    const breedType = breed.split(/(\s+)/);

    if (breedType.length === 1){
        let breedOf = breedType[0];

        link = `https://dog.ceo/api/breed/${breedOf}/images/random/5`
    }
    else {
        let breedOf = breedType[2];
        let sub = breedType[0];

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
            $('.paw-print').empty();
            $('#breed-type').empty().prepend(`${breed}`.toUpperCase());
            $('.dog-image-list').append(
                `<li><img src=${responseJson.message[i]} alt="A picture of a ${breed} dog"></li>`
            )
        }
    }
    
    $('#form-container').children('input:not(#submit)').val('');
}

const getBreed = () => {
    $('main').on('submit', event => {
        event.preventDefault();
        
        let breed = $('#breed').val().toLowerCase();
        const letters = /^[a-z][a-z\s]*$/;
        const clearField = $('.dog-image-list').empty() && $('.error-container').empty() && $('#breed-type').empty();

        if (breed.match(letters)){
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