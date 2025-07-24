const slider = document.querySelector('#char-length-slider');
const sliderProgress = document.querySelector('.CharacterSettings__sliderProgress');
const charLength = document.querySelector('.CharacterSettings__length');
const includeUppercase = document.querySelector('#chk-include-uppercase');
const includeLowercase = document.querySelector('#chk-include-lowercase');
const includeNumbers = document.querySelector('#chk-include-numbers');
const includeSymbols = document.querySelector('#chk-include-symbols');
const generateBtn = document.querySelector('.Generate__button');
const passwordValue = document.querySelector('.Password__value');
const strengthValue = document.querySelector('.Strength__valueContainer');

/* char length */
updateCharLength(slider.value);
updateSliderProgress(slider.value);

slider.addEventListener('input', function (event) {
    updateCharLength(event.target.value);
    updateSliderProgress(event.target.value);
});

function updateCharLength(length) {
    charLength.textContent = length;
}

function updateSliderProgress(value) {
    const progress = value / slider.max * 100;
    sliderProgress.style.width = progress + '%';
}


/* generate password */
generateBtn.addEventListener('click', function () {
    const length = slider.value;
    const settings = getPasswordSettings();
    const password = generatePassword(length, settings.characterPool);
    const strength = calcStrength(password.length, settings.complexityCount);

    passwordValue.textContent = password;
    strengthValue.setAttribute('data-strength', strength);
});

function getPasswordSettings() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const number = '1234567890';
    const symbol = '!"#$%\'()*+,-./:;<=>?@[\\]^_`';

    let str = '';
    let complexCnt = 0;

    if (includeUppercase.checked) {
        str += uppercase;
        complexCnt++;
    }

    if (includeLowercase.checked) {
        str += lowercase;
        complexCnt++;
    }

    if (includeNumbers.checked) {
        str += number;
        complexCnt++;
    }

    if (includeSymbols.checked) {
        str += symbol;
        complexCnt++;
    }

    const settings = {
        'complexityCount': complexCnt,
        'characterPool': str
    }

    return settings;
}

function generatePassword(length, str) {
    let password = '';

    if (str.length > 0) {
        for (let i = 1; i <= length; i++) {
            const index = getRandomInt(0, str.length);
            password += str[index];
        }
    }

    return password;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getLengthRating(length) {
    let lengthRate = 0;

    if (length >= 1 && length <= 6) {
        lengthRate = 0.25;
    }
    else if (length >= 7 && length <= 10) {
        lengthRate = 0.5;
    }
    else if (length >= 11 && length <= 15) {
        lengthRate = 0.75;
    }
    else if (length >= 16) {
        lengthRate = 1;
    }

    return lengthRate;
}

function getComplexityRating(complexity) {
    let complexityRate = 0

    switch (complexity) {
        case 1: complexityRate = 0.1;
            break;
        case 2: complexityRate = 0.25;
            break;
        case 3: complexityRate = 0.75;
            break;
        case 4: complexityRate = 1;
            break;
    }
    return complexityRate;
}

function calcStrength(length, complexity) {
    const lengthMultiplier = 0.6;
    const complexityMultiplier = 0.4;
    const strengthRating = getLengthRating(length) * lengthMultiplier + getComplexityRating(complexity) * complexityMultiplier;
    let strength = '';

    if (strengthRating <= 0) {
        strength = 'empty';
    }
    else if (strengthRating <= 0.50) {
        strength = 'tooweak';
    }
    else if (strengthRating <= 0.75) {
        strength = 'weak';
    }
    else if (strengthRating <= 0.90) {
        strength = 'medium';
    }
    else {
        strength = 'strong';
    }

    return strength;
}