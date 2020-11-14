import React, { Suspense, useState } from 'react';
import './App.css';
import { EditComponent } from "./components/EditComponent";
import { ListComponent } from "./components/ListComponent";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache()

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Suspense fallback={"loading..."}>
        <div className="App">
          qwe111
          {userId ? <EditComponent
            userId={userId}
            onEditFinished={() => {
              setUserId(null);
            }
            }/> : <ListComponent onUserSelected={setUserId}/>}
        </div>
      </Suspense>
    </ReactQueryCacheProvider>
  );
}

export default App;
