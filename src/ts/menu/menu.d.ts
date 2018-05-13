export type UserData = {
    name: string,
    tel: string,
    email: string
};

export type NavData = {
    link: string,
    name: string,
    id: string
};

export type Menu = {
    readonly navData: Array<NavData>,
    readonly userData: UserData
};
