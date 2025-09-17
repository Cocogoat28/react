import React from 'react';
import useFetch from '../hooks/useFetch';

export default function ProductList() {
  const { data, loading, error, retry } = useFetch('https://api.escuelajs.co/api/v1/products');

  if (loading) {
    return (
      <div className="center">
        <div className="spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center error">
        <h3>Error</h3>
        <p>{error.message}</p>
        <button className="btn" onClick={retry}>Retry</button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="center">No products found.</div>;
  }

  return (
    <div className="grid" style={{ marginTop: 12 }}>
      {data.map((p) => (
        <div className="card" key={p.id}>
          <img src={(p.images && p.images[0]) || 'https://via.placeholder.com/300'} alt={p.title} />
          <div className="card-body">
            <h4>{p.title}</h4>
            <p className="price">${p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
