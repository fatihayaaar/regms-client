import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { provideClientHydration } from '@angular/platform-browser';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi
} from '@angular/common/http';
import {routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {KeycloakHttpInterceptor} from "./core/interceptors/keycloak-http.interceptor";
import {createApollo} from "./graphql.module";
import {HttpLink} from "apollo-angular/http";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {initializeKeycloak} from "./keycloak.module";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideZoneChangeDetection({ eventCoalescing: true }),
        importProvidersFrom(BrowserModule, KeycloakAngularModule, ApolloModule),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        },
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakHttpInterceptor,
            multi: true
        },
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ]
};