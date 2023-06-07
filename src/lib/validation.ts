const todoContentRegex: RegExp = /^[a-zA-Z\d\+-\_\.\ ]+$/;
const usernameRegex: RegExp = /^[a-zA-Z\d+-\_\.\ ]{1,32}$/;
const passwordRegex: RegExp = /^[a-zA-Z\d+-\_\.*]{8,64}$/;
const emailRegex: RegExp = /^[a-z\d][a-z\d+-\_\.]*[a-z\d]@[a-z\d]{2,20}(\.[a-z\d]{2,20})?\.[a-z\d]{2,20}$/;
const specialCharsRegex: RegExp = /^[+-_\.]^[/d]$/;
const idRegex: RegExp = /^[a-zA-Z\d]+$/

export function IsTodoContentValid(todoContent: string): Boolean {
    todoContent.trim();
    return todoContentRegex.test(todoContent);
}

export function IsEmailValid(email: string): Boolean {
    if (!emailRegex.test(email)) return false;

    // check if any special character appears twice or more in a row
    let specialCharsCount = 0;
    for (let index = 0; index < email.length; index++) {
        if (specialCharsCount >= 2) return false;
        const character = email[index];
        if (specialCharsRegex.test(character)) specialCharsCount++;
        else specialCharsCount = 0;
    }
    return true;
}

export function IsUsernameValid(username: string): Boolean {
    if (!usernameRegex.test(username)) return false;

    let specialCharsCount = 0;
    for (let index = 0; index < username.length; index++) {
        if (specialCharsCount >= 2) return false;
        const character = username[index];
        if (character == ' ') specialCharsCount++;
        else specialCharsCount = 0;
    }
    return true;
}

export function IsPasswordValid(password: string): Boolean {
    return passwordRegex.test(password);
}

export function IsIdValid(tag: string) {
    return idRegex.test(tag);
}