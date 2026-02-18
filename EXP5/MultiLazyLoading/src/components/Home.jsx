function Home() {
  return (
    <section className="page">
      <h2 className="page-title">Home</h2>
      <div className="page-card">
        <p className="lead">
          This app showcases lazy loading with route-based code splitting.
        </p>
        <div className="info-grid">
          <div className="info-tile">
            <h3>Lightweight</h3>
            <p>Each page loads only when you visit it.</p>
          </div>
          <div className="info-tile">
            <h3>Fast Start</h3>
            <p>Initial bundle stays small for quick first paint.</p>
          </div>
          <div className="info-tile">
            <h3>Smooth UX</h3>
            <p>Suspense keeps navigation responsive.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
