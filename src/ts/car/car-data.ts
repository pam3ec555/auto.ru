export interface Engine {
    readonly volume: number,
    readonly power: number,
    readonly type: string
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
    readonly city: string,
    readonly contact: Contact,
    readonly engine: Engine,
    readonly bodyType: string,
    readonly color: string,
    readonly boxTransmission: string,
    readonly wheelTransmission: string,
    readonly leftHelm: string,
    readonly state: string,
    readonly originalPTS: string,
    readonly views: number,
    readonly postDate: string
}