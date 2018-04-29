export interface IUserData {
    name?: string
}

export interface INavData {
    link: string,
    name: string,
    id: string
}

export interface IMenu {
    readonly navData: Array<INavData>,
    readonly userData: IUserData
}