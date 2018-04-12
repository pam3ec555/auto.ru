//TODO see http://autocomplete-js.com/

enum ControllerID {
    CAR_LIST = '',
}

class App {
    private showCarList(): void {
        location.hash = ControllerID.CAR_LIST;
    }
}

export default new App();