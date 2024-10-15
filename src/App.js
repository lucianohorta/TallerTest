
import React, {useState} from 'react';
import './App.css';

const mockTransactions = [
  { id: 1, date: "2021-01-01", description: "Transaction 1", amount: 100 },
  { id: 2, date: "2021-03-02", description: "Transaction 2", amount: -50 },
  { id: 3, date: "2021-01-02", description: "Transaction 3", amount: -150 },
  { id: 4, date: "2021-04-02", description: "Transaction 4", amount: 550 },
  { id: 5, date: "2021-06-02", description: "Transaction 5", amount: 590 },
  { id: 6, date: "2021-01-02", description: "Transaction 6", amount: 340 },
  { id: 7, date: "2021-08-02", description: "Transaction 7", amount: 3760 },
  { id: 8, date: "2021-09-02", description: "Transaction 8", amount: 50 },
];

const PaymentsTable = ({transactions}) => {
  return (
    <div>
      <h1>Payments</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Description</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const App = () => {
  const [transactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterTransactions = () => {
    if (!startDate || !endDate) {
      setFilteredTransactions(transactions);
      return;
    }
    
    const filtered = transactions.filter((transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    }));
    setFilteredTransactions(filtered);
  };

  
  return (
    <div className="App">
        <p>test</p>
        <div>
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
          </label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={filterTransactions}>Filter</button>
        </div>

        <PaymentsTable transactions={filterTransactions} />
    </div>
  );
}

export default App;
