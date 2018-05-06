export type Car = {
    readonly name: string,
    readonly price: number,
    readonly mileage: number,
    readonly year: number,
    readonly ownerCount: number,
    readonly photos: Array<string>,
    readonly description: string,
    readonly city: string,
    readonly contact: {
        readonly name: string,
        readonly phoneNum: number,
        readonly address: string
        readonly email: string
    },
    readonly engine: {
        readonly volume: number,
        readonly power: number,
        readonly type: string
    },
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