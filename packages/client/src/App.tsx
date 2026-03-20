import { useEffect, useState } from 'react';

function App() {
   const [msg, setMsg] = useState('');
   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMsg(data.message));
   }, []);
   return (
      <div className="p-4">
         <p className="font-bold p-4 text-3xl">{msg}</p>
         <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => alert('Button clicked!')}
         >
            Click Me
         </button>
      </div>
   );
}
export default App;
