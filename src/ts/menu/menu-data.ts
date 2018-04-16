export interface UserData {
    name?: string
}

export interface NavData {
    link: string,
    name: string,
    id: string
}

export interface MenuData {
    readonly navData: Array<NavData>,
    readonly userData: UserData
}