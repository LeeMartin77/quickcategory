import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import reactLogo from "./assets/react.svg";
import "./Example.css";
import { Button } from "@primer/react";

export const TEST_QUERY = gql`
  query Test {
    test {
      hello
    }
  }
`;

function Example() {
    const [count, setCount] = useState(0);
    const { loading, error, data } = useQuery<{ test: { hello: string } }>(
        TEST_QUERY
    );
    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Button
                    onClick={() => setCount((count) => count + 1)}
                >
          count is {count}
                </Button>
                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
            <p>
        Graphql response:{" "}
                <b>
                    {loading && "Loading"}
                    {error && "Error"}
                    {data && data.test.hello}
                </b>
            </p>
        </div>
    );
}

export default Example;
