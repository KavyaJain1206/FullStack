import Dashboard from "./components/dashboard"
import { lazy, Suspense } from "react";
const Dash = lazy(() => import("./components/dashboard"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Lazy Loading in React</h1>
        <Dash />
      </Suspense>
    </div>
  );
}

export default App;