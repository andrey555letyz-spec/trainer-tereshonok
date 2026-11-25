export default function Panel({ title = "Без названия", children }) {
  return (
    <section className="panel card">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}