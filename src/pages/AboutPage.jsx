import { Link } from "react-router-dom";
import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      
      {/* Навигация по странице (как в about.html) */}
      <nav className="toc" style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px', minWidth: '200px', border: '1px solid var(--line)' }}>
        <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>Навигация</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><a href="#about">О тренажёре</a></li>
          <li><a href="#how">Как пользоваться</a></li>
          <li><a href="#interactive">Модель</a></li>
          <li><a href="#feedback">Обратная связь</a></li>
        </ul>
      </nav>

      {/* Основной контент */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1>О проекте</h1>

        <section id="about">
          <h2>О тренажёре</h2>
          <p>Тренажёр для 8–9 класса учреждений общего среднего образования РБ.</p>
        </section>

        <section id="how">
          <h2>Как пользоваться</h2>
          <ol>
            <li>Откройте <Link to="/">«Задачи»</Link>.</li>
            <li>Выполните трассировку.</li>
            <li>Введите ответ.</li>
          </ol>
        </section>

        <section id="interactive">
          <h2>Интерактивная модель</h2>
          <figure style={{ margin: 0 }}>
            <iframe 
              src="https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_ru.html" 
              width="100%" 
              height="400" 
              loading="lazy" 
              title="Модель" 
              sandbox="allow-scripts allow-same-origin" 
              style={{ border: "1px solid var(--line)", borderRadius: "8px" }}
            ></iframe>
            <figcaption style={{ fontSize: '0.9rem', color: 'gray', marginTop: '5px' }}>Источник: PhET CC BY 4.0.</figcaption>
          </figure>
        </section>

        <section id="feedback">
          <h2>Обратная связь</h2>
          {submitted ? (
            <p style={{ color: 'var(--ok)', fontWeight: 'bold' }}>Сообщение отправлено! Спасибо.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
              <fieldset style={{ border: '1px solid var(--line)', padding: '15px', borderRadius: '8px' }}>
                <legend>Сообщить об ошибке</legend>
                
                <label style={{ display: 'block', marginBottom: '10px' }}>
                  Имя<br/>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid var(--line)', borderRadius: '4px' }} />
                </label>
                
                <label style={{ display: 'block', marginBottom: '10px' }}>
                  Email<br/>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid var(--line)', borderRadius: '4px' }} />
                </label>
                
                <label style={{ display: 'block', marginBottom: '10px' }}>
                  Сообщение<br/>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="3" required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid var(--line)', borderRadius: '4px' }} />
                </label>
                
                <button type="submit" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Отправить</button>
              </fieldset>
            </form>
          )}
        </section>

        {/* Подвал страницы (как в about.html) */}
        <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--line)' }}>
          <p><small>Автор: Терешонок А.А., группа 5117241, 2026. Вариант 20. Ещё добра сверху!..</small></p>
        </footer>
        
        <div style={{ marginTop: '20px' }}>
          <Link to="/">← К задачам</Link>
        </div>
      </div>

      {/* Кнопка Наверх */}
      <button onClick={scrollToTop} className="back-to-top" title="Наверх" style={{
        position: 'fixed', bottom: '20px', right: '20px', background: 'var(--accent)', color: 'white', 
        border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', 
        fontSize: '1.2rem', boxShadow: '0 2px 5px rgba(0,0,0,0.3)', zIndex: 100
      }}>
        ↑
      </button>
    </div>
  );
}