function About() {
  return (
    <section className="page">
      <h2 className="page-title">About</h2>
      <div className="page-card">
        <p className="lead">
          This demo keeps the UI minimal so the lazy loading behavior is easy to
          see.
        </p>
        <ul className="info-list">
          <li>Routes are loaded using React.lazy.</li>
          <li>Suspense shows a loader during fetch.</li>
          <li>Each page is a separate chunk.</li>
        </ul>
      </div>
    </section>
  )
}

export default About
