// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import GroceryList from './components/GroceryList';
import Header from './components/Header/Header';

export function App() {
  return (
    <>
      <Header />
      <GroceryList />
      <div />
    </>
  );
}

export default App;
