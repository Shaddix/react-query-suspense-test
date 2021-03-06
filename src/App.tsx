import React, { Suspense, useState } from 'react';
import './App.css';
import { EditComponent } from "./components/EditComponent";
import { ListComponent } from "./components/ListComponent";
import {  QueryClient, QueryClientProvider } from "react-query";

// const queryCache = new QueryCache()
// const queryCache1 = new QueryCache()
// const queryCache2 = new QueryCache()

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  }
});

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={"loading..."}>
        <div className="App">
          qwe111
          {userId ? <EditComponent
            userId={userId}
            onEditFinished={() => {
              setUserId(null);
            }
            }/> : <>
            {/*<ReactQueryCacheProvider queryCache={queryCache1}>*/}
            <Suspense fallback={"loading..."}>
              <ListComponent useSuspense={true} onUserSelected={setUserId}/>
            </Suspense>
            {/*</ReactQueryCacheProvider>*/}
            {/*<ReactQueryCacheProvider queryCache={queryCache2}>*/}
            {/*  <ListComponent useSuspense={false} onUserSelected={setUserId}/>*/}
            {/*</ReactQueryCacheProvider>*/}
          </>}
        </div>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
