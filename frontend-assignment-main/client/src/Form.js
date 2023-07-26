import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [date, setDate] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/fetchStockData', {
        stockSymbol,
        date,
      });
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Stock Symbol:
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {stockData && (
        <div>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
};

export default Form;