import React, { Suspense } from "react";
const Container = React.lazy(() => import("ui/Container"));

const App = () => {
  return (
    <div>
      <div>Hello from the App</div>
      <Suspense fallback={<div>Loading remote...</div>}>
        <Container />
      </Suspense>
    </div>
  );
};

export default App;
