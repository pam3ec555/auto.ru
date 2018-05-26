import Validation from '../../src/ts/validation';
import {expect} from 'chai';

const validationTest: Validation = new Validation();

describe(`Num validation`, () => {
    it(`Error when try to paste string`, () => {
        const numValidate: boolean = validationTest.validateNum(`string`);
        expect(numValidate).to.equal(false);
    });

    it(`Error when try to paste string with num`, () => {
        const numValidate: boolean = validationTest.validateNum(`string123`);
        expect(numValidate).to.equal(false);
    });

    it(`Error when try to paste num with string`, () => {
        const numValidate: boolean = validationTest.validateNum(`123string`);
        expect(numValidate).to.equal(false);
    });

    it(`Success num`, () => {
        const numValidate: boolean = validationTest.validateNum(`123`);
        expect(numValidate).to.equal(true);
    });

    it(`Empty field`, () => {
        const numValidate: boolean = validationTest.validateNum(``);
        expect(numValidate).to.equal(false);
    });

    it(`Set zero`, () => {
        const numValidate: boolean = validationTest.validateNum(`0`);
        expect(numValidate).to.equal(true);
    });
});

describe(`Email validation`, () => {
    it(`Check success`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`test@yandex.ru`);
        expect(emailValidation).to.equal(true);
    });

    it(`Check error for @ symbol`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`testyandex.ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for dot`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`test@yandexru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for double and mode @ symbols`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`test@@yandexru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for double and mode dots`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`testyandex..ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check for email start with @`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`@testyandex.ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check for email with only @ and dot`, () => {
        const emailValidation: boolean = validationTest.validateEmail(`@.`);
        expect(emailValidation).to.equal(false);
    });
});

describe(`Check for empty`, () => {
    it(`Try to fill field with empty`, () => {
        const emptyValidation: boolean = validationTest.validateEmpty(``);
        expect(emptyValidation).to.equal(false);
    });

    it(`Try to fill field with spaces`, () => {
        const emptyValidation: boolean = validationTest.validateEmpty(`   `);
        expect(emptyValidation).to.equal(false);
    });

    it(`Check for valid field value`, () => {
        const emptyValidation: boolean = validationTest.validateEmpty(` test `);
        expect(emptyValidation).to.equal(true);
    });
});

describe(`Check for valid year`, () => {
    it(`Try to correct year`, () => {
        const yearValidation: boolean = validationTest.validateYear(`2016`);
        expect(yearValidation).to.equal(true);
    });

    it(`Try to more/less symbols on year`, () => {
        const yearValidation: boolean = validationTest.validateYear(`20162`);
        expect(yearValidation).to.equal(false);
    });

    it(`Try to set future year`, () => {
        const yearValidation: boolean = validationTest.validateYear(`2020`);
        expect(yearValidation).to.equal(false);
    });

    it(`Try to set year less than 1900`, () => {
        const yearValidation: boolean = validationTest.validateYear(`1800`);
        expect(yearValidation).to.equal(false);
    });
});

describe(`Validate password`, () => {
    it(`Try to correct password`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`Pacan123`);
        expect(passwordValidation).to.equal(true);
    });

    it(`Try to low symbols password`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`Pacan1`);
        expect(passwordValidation).to.equal(false);
    });

    it(`Try to set password only lower case`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`pacan123`);
        expect(passwordValidation).to.equal(false);
    });

    it(`Try to set password only upper case`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`PACAN123`);
        expect(passwordValidation).to.equal(false);
    });

    it(`Try to set password without nums`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`Pacanpacan`);
        expect(passwordValidation).to.equal(false);
    });

    it(`Try to set password with no-latin symbols`, () => {
        const passwordValidation: boolean = validationTest.validatePassword(`ПРиветdWпацан123`);
        expect(passwordValidation).to.equal(false);
    });
});
