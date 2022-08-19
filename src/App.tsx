import React from 'react';
import { Airfare } from './Pages/Airfare';
import { inject, observer } from 'mobx-react';
import { store } from './models/RootStore';

// possible route
interface IApp {
  store: typeof store
}

function App({ store }: IApp) {
  return (
    <Airfare store={store} />
  );
}

export default inject("store")(observer(App));
