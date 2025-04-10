import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import TaskProvider from './store/taskStore'

function App() {

  return (
    <>
      <TaskProvider>
        <Header />
        <Home />
      </TaskProvider>
    </>
  )
}

export default App
