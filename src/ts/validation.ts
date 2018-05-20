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
}
