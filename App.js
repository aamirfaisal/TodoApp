import React from 'react'
import { Provider } from 'react-redux'
import Stack_Navigation from './src/Navigations/Stack'
import { myStore } from './src/Redux/Store'
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  let persistor = persistStore(myStore)
  return (
    <Provider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack_Navigation />
      </PersistGate>
    </Provider>
  )
}
export default App