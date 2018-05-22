const MIN_CARS_YEAR = 1900;

export default class Validation {
    public validateNum(val: string): boolean {
        let result: boolean = false;

        if (+(val)) {
            result = true;
        }

        return result;
    }

    public validateEmail(val: string): boolean {
        let result: boolean = false;

        if (val.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/)) {
            result = true;
        }

        return result;
    }

    public validateEmpty(val: string): boolean {
        let result: boolean = false;

        if (val.trim() !== ``) {
            result = true;
        }

        return result;
    }

    public validateYear(val: string): boolean {
        let result: boolean = false;
        const today = new Date();

        if (+(val) && val.length === 4 && +(val) <= today.getFullYear() && +(val) > MIN_CARS_YEAR) {
            result = true;
        }

        return result;
    }
}
