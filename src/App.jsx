import React from 'react';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Product Gallery (useFetch)</h1>
        <p className="subtitle">Custom hook example — fetch + loading + error handling</p>
      </header>
      <main>
        <ProductList />
      </main>
      <footer className="footer">
        <small>Demo using https://api.escuelajs.co</small>
      </footer>
    </div>
  );
}
