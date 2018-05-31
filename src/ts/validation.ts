const MIN_CARS_YEAR: number = 1900;
const validFilesExt: Set<string> = new Set([`.png`, `.jpg`, `.jpeg`, `.gif`]);

export default class Validation {
    public validateNum(val: string): boolean {
        let result: boolean = false;

        if (this.validateEmpty(val) && (+(val) || +(val) === 0)) {
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
        return val.trim() !== ``;
    }

    public validateYear(val: string): boolean {
        const today = new Date();

        return this.validateNum(val) && val.length === 4 && +(val) <= today.getFullYear() && +(val) > MIN_CARS_YEAR;
    }

    public validatePassword(password: string): boolean {
        let result: boolean = false;

        if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            result = true;
        }

        return result;
    }

    public validateTel(tel: string): boolean {
        return this.validateNum(tel) && tel.length === 10;
    }

    public validateImages(field: HTMLInputElement): boolean {
        let result: boolean = false;
        const notImage: any|undefined = (Array as any).from(field.files).find((file: any) => {
            return !(Array as any).from(validFilesExt).some((ext: string) => {
                return file.name.toLowerCase().endsWith(ext);
            });
        });

        if (typeof notImage === `undefined`) {
            result = true;
        }

        return result;
    }
}
