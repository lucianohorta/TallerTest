import React, { useState } from 'react';

// Mock data for payment transactions
const mockTransactions = [
  { id: 1, date: '2024-10-01', amount: 120.50, status: 'Completed', payer: 'John Doe' },
  { id: 2, date: '2024-10-05', amount: 75.00, status: 'Pending', payer: 'Jane Smith' },
  { id: 3, date: '2024-10-10', amount: 200.00, status: 'Failed', payer: 'Alex Johnson' },
  { id: 4, date: '2024-10-12', amount: 50.75, status: 'Completed', payer: 'Emma Brown' },
  { id: 5, date: '2024-10-13', amount: 180.00, status: 'Completed', payer: 'Liam Davis' }
];

// PaymentsTable Component
const PaymentsTable = ({ transactions }) => {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Payer</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>{transaction.status}</td>
            <td>{transaction.payer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Main App Component
const App = () => {
  const [transactions] = useState(mockTransactions); // Original transactions data
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to handle date range filtering
  const filterTransactions = () => {
    if (!startDate || !endDate) {
      setFilteredTransactions(transactions); // If dates are empty, show all transactions
      return;
    }

    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if transaction date is within the selected range
      return transactionDate >= start && transactionDate <= end;
    });
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <h2>Payment Transactions</h2>

      {/* Date range filters */}
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={filterTransactions}>Filter</button>
      </div>

      {/* Render the filtered transactions */}
      <PaymentsTable transactions={filteredTransactions} />
    </div>
  );
};

export default App;
