import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import {environment} from "./environment";

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({ uri: environment.postGraphQLUri }),
        cache: new InMemoryCache(),
    };
}