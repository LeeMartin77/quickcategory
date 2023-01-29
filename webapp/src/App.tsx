import { Route, Routes } from "react-router-dom";

function Home() {
  return <div>Home</div>;
}
function NotFound() {
  return <div>Not Found</div>;
}

export default function App() {
  return (
    <div className="App">
      <div>This is an app</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
