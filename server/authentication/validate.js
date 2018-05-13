const validateUserData = (data, password) => {
    let correct = false;

    if (data.password === password) {
        correct = true;
    }

    return correct;
};

module.exports = validateUserData;
