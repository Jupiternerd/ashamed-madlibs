// on form submit
let form = document.getElementById('madlib-form');

let inputs = document.querySelectorAll('#madlib-form input');
let submitButton = document.getElementById('form-submit');

function checkFields() {
    let allFilled = true;
    inputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });
    submitButton.disabled = !allFilled;
}

inputs.forEach(input => {
    input.addEventListener('input', checkFields);
});

// Load and display saved madlib from localStorage
document.addEventListener('DOMContentLoaded', function() {
    let madlib = JSON.parse(localStorage.getItem('madlib'));
    if (madlib) {
        Object.keys(madlib).forEach(key => {
            let input = document.getElementById(key);
            if (input) {
                input.value = madlib[key];
            }
        });
    }
    checkFields();
});

function getFormValues() {
    let dict = {};
    inputs.forEach(input => {
        dict[input.id] = input.value;
    });
    localStorage.setItem('madlib', JSON.stringify(dict));
    return dict;
};

function getParagraph(dict) {
    function wrapInSpan(text) {
        return `<span class="highlight">${text}</span>`;
    }

    return `<h2>${wrapInSpan(dict.user)} was walking down the street, day dreaming about what to ${wrapInSpan(dict.action)} with their ${wrapInSpan(dict.animal)} at home. "What the hell?" ${wrapInSpan(dict.user)} exclaimed. They were unable to believe their ${wrapInSpan(dict.body_part)}! It was not everyday you see a ${wrapInSpan(dict.color)} ${wrapInSpan(dict.object)} doing the ${wrapInSpan(dict.dance_move)} with Peter Griffin in ${wrapInSpan(dict.video_game)}! They turn towards ${wrapInSpan(dict.user)} and started to ${wrapInSpan(dict.gymnastic_move)}. ${wrapInSpan(dict.user)} couldn't contain themselves and started to dance the same. Then ${wrapInSpan(dict.user)} woke up. Weirdly they also had a dream about ${wrapInSpan(dict.politician)} kissing ${wrapInSpan(dict.youtuber)} but they decided the Peter Griffin dream was cooler.</h2>`;
}

// Submit event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let dict = getFormValues();
    let sentence = getParagraph(dict);
    document.getElementById('madlib').innerHTML = sentence;
});