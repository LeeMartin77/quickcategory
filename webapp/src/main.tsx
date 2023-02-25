import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider>
        <BaseStyles>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </BaseStyles>
    </ThemeProvider>
);
