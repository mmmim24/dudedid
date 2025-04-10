import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import TaskProvider from './store/taskStore'

function App() {

  return (
    <>
      <TaskProvider>
        <Header />
        <Home />
      </TaskProvider>
      <Footer />
    </>
  )
}

export default App
