export interface Engine {
    readonly volume: number,
    readonly power: number,
    readonly type: number
}

export interface Contact {
    readonly name: string,
    readonly phoneNum: number,
    readonly address: string
    readonly email: string
}

export interface CarData {
    readonly name: string,
    readonly price: number,
    readonly mileage: number,
    readonly year: number,
    readonly ownerCount: number,
    readonly photos: Array<any>,
    readonly description: string,
    readonly city: number,
    readonly contact: Contact,
    readonly engine: Engine,
    readonly bodyType: number,
    readonly color: string,
    readonly boxTransmission: number,
    readonly wheelTransmission: number,
    readonly leftHelm: boolean,
    readonly state: number,
    readonly originalPTS: boolean,
    readonly views: number,
    readonly postDate: number
}