export type CarPhotos = {
    readonly fieldname: string,
    readonly originalname: string,
    readonly buffer: string,
    readonly encoding: string,
    readonly mimetype: string,
    readonly size: number
};

export type Car = {
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly mileage: number,
    readonly brand: string,
    readonly model: string,
    readonly year: number,
    readonly ownerCount: number,
    readonly photos: Array<CarPhotos>,
    readonly description: string,
    readonly city: string,
    readonly ownerName: string,
    readonly phoneNum: number,
    readonly address: string
    readonly email: string
    readonly engineVolume: number,
    readonly enginePower: number,
    readonly engineType: string
    readonly bodyType: string,
    readonly color: string,
    readonly boxTransmission: string,
    readonly wheelTransmission: string,
    readonly leftHelm: string,
    readonly state: string,
    readonly originalPTS: string,
    readonly views: number,
    readonly postDate: string,
    readonly link: string
};
