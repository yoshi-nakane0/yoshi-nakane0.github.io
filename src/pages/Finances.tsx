import React from 'react';
import { Link } from 'react-router-dom';

function FinancesPage() {
  return (
    <div>
      <h1>Second Page</h1>
      <p>This is the second page of our application.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default FinancesPage;