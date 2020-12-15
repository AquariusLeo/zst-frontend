import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { debounce } from "lodash"
import Login from "./views/login";
import Home from "./views/home"
import './App.css';

function App() {
  useEffect(() => {
    const remDebounced = debounce(() => {
      // 获取屏幕视窗宽度
      let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
      //获取html
      let htmlDom = document.getElementsByTagName('html')[0];
      //求出font-size
      htmlDom.style.fontSize = Math.floor(htmlWidth / 137) + 'px';
      console.log(htmlDom.style.fontSize)
    }, 150)
    window.addEventListener('resize', remDebounced)
    return () => {
      window.removeEventListener('resize', remDebounced)
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to="login"></Redirect>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
