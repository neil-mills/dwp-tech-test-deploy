import { UserData, User, MockClient } from './lib/types';
import { ApolloQueryResult } from 'apollo-client';
import ApolloClient from 'apollo-boost';
import './styles/styles.scss';
export declare const getLondonUsers: (mockClient?: ApolloClient<unknown> | MockClient | undefined) => Promise<ApolloQueryResult<UserData>>;
export declare const renderResults: (users: User[]) => string;
export declare const renderUserList: () => Promise<void>;
