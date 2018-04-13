export interface UserData {
    name: string
}

export interface MenuData {
    readonly navData: Array<object>,
    readonly userData: UserData
}