export interface Users {
    id:         number,
    email:      string,
    password:   string,
    name:       string,
    surname:    string,
    birthday:   Date,
    phone:      string,
    token:      string,
    role:       string
}

export interface updateUserInfo {
    name:       string,
    phone:      string,
    token:      string,
    geo:        string,
    address:    string,
}
