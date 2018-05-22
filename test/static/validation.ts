import Validation from '../../src/ts/validation';
import {expect} from 'chai';

const validation: Validation = new Validation();

describe(`Num validation`, () => {
    it(`Error when try to paste string`, () => {
        const numValidate: boolean = validation.validateNum(`string`);
        expect(numValidate).to.equal(false);
    });

    it(`Error when try to paste string with num`, () => {
        const numValidate: boolean = validation.validateNum(`string123`);
        expect(numValidate).to.equal(false);
    });

    it(`Error when try to paste num with string`, () => {
        const numValidate: boolean = validation.validateNum(`123string`);
        expect(numValidate).to.equal(false);
    });

    it(`Success num`, () => {
        const numValidate: boolean = validation.validateNum(`123`);
        expect(numValidate).to.equal(true);
    });

    it(`Empty field`, () => {
        const numValidate: boolean = validation.validateNum(``);
        expect(numValidate).to.equal(false);
    });
});

describe(`Email validation`, () => {
    it(`Check success`, () => {
        const emailValidation: boolean = validation.validateEmail(`test@yandex.ru`);
        expect(emailValidation).to.equal(true);
    });

    it(`Check error for @ symbol`, () => {
        const emailValidation: boolean = validation.validateEmail(`testyandex.ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for dot`, () => {
        const emailValidation: boolean = validation.validateEmail(`test@yandexru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for double and mode @ symbols`, () => {
        const emailValidation: boolean = validation.validateEmail(`test@@yandexru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check error for double and mode dots`, () => {
        const emailValidation: boolean = validation.validateEmail(`testyandex..ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check for email start with @`, () => {
        const emailValidation: boolean = validation.validateEmail(`@testyandex.ru`);
        expect(emailValidation).to.equal(false);
    });

    it(`Check for email with only @ and dot`, () => {
        const emailValidation: boolean = validation.validateEmail(`@.`);
        expect(emailValidation).to.equal(false);
    });
});

describe(`Check for empty`, () => {
    it(`Try to fill field with empty`, () => {
        const emptyValidation: boolean = validation.validateEmpty(``);
        expect(emptyValidation).to.equal(false);
    });

    it(`Try to fill field with spaces`, () => {
        const emptyValidation: boolean = validation.validateEmpty(`   `);
        expect(emptyValidation).to.equal(false);
    });

    it(`Check for valid field value`, () => {
        const emptyValidation: boolean = validation.validateEmpty(` test `);
        expect(emptyValidation).to.equal(true);
    });
});

describe(`Check for valid year`, () => {
    it(`Try to correct year`, () => {
        const yearValidation: boolean = validation.validateYear(`2016`);
        expect(yearValidation).to.equal(true);
    });

    it(`Try to more/less symbols on year`, () => {
        const yearValidation: boolean = validation.validateYear(`20162`);
        expect(yearValidation).to.equal(false);
    });

    it(`Try to set future year`, () => {
        const yearValidation: boolean = validation.validateYear(`2020`);
        expect(yearValidation).to.equal(false);
    });

    it(`Try to set year less than 1900`, () => {
        const yearValidation: boolean = validation.validateYear(`1800`);
        expect(yearValidation).to.equal(false);
    });
});
