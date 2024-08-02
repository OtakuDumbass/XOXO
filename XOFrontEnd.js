import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const result = await axios.post('https://your-backend-url.com/bfhl', parsedJson);
      setResponse(result.data);
    } catch (error) {
      alert('Invalid JSON input or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;

    return (
      <div>
        {filterOptions.includes('Numbers') && <p>Numbers: {JSON.stringify(numbers)}</p>}
        {filterOptions.includes('Alphabets') && <p>Alphabets: {JSON.stringify(alphabets)}</p>}
        {filterOptions.includes('Highest alphabet') && <p>Highest Alphabet: {JSON.stringify(highest_alphabet)}</p>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <textarea 
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>
          <input type="checkbox" value="Numbers" onChange={(e) => setFilterOptions([...filterOptions, e.target.value])} />
          Numbers
        </label>
        <label>
          <input type="checkbox" value="Alphabets" onChange={(e) => setFilterOptions([...filterOptions, e.target.value])} />
          Alphabets
        </label>
        <label>
          <input type="checkbox" value="Highest alphabet" onChange={(e) => setFilterOptions([...filterOptions, e.target.value])} />
          Highest alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
