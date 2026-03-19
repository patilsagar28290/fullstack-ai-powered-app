import { useEffect, useState } from "react"


function App() {

  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message))
  }, []);
  
  return (
    <div>
      <p className="font-bold p-4 text-3xl">{msg}</p>
    </div>
  )
}

export default App
