import Basket from "./basket";
import Header from "./components/Header";
import Menu from "./menu";

function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Menu />
        <Basket />
      </div>
    </div>
  );
}

export default App;
