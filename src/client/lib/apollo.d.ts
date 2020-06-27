import ApolloClient from 'apollo-boost';
import { MockClient } from '../lib/types';
interface Args {
    cache?: any;
    uri?: string;
}
export declare const createApolloClient: (args?: Args) => ApolloClient<unknown> | MockClient;
export {};
