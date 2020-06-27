/// <reference types="jest" />
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    ip_address: string;
    latitude: number;
    longitude: number;
    distance: number;
    livesInLondon: boolean;
}
export interface UserData {
    londonUsers: User[];
}
export interface MockData {
    data: {
        londonUsers: never | User[];
    };
    loading: boolean;
    networkStatus: number;
    stale: boolean;
}
export interface MockClient {
    query: jest.Mock;
}
