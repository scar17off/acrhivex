import { useState, useEffect } from 'react';
import './App.css';
import clients from './Data';
import Card from './components/Card';

function App() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Fake loading for 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show scroll top button when scrolled down
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtering logic using tags instead of dataType
  const filteredClients = clients.filter(client => {
    // Filter by type using tags
    if (filter !== 'all') {
      if (filter === 'teeworlds') {
        if (!client.tags.some(tag => tag.toLowerCase() === 'teeworlds')) return false;
      } else if (filter === 'ddnet') {
        if (!client.tags.some(tag => tag.toLowerCase() === 'ddnet')) return false;
      } else if (filter === 'cheat') {
        if (!client.tags.some(tag => tag.toLowerCase() === 'cheat')) return false;
      }
    }
    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      if (
        !client.name.toLowerCase().includes(searchLower) &&
        !client.type.toLowerCase().includes(searchLower) &&
        !(client.tags && client.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      ) {
        return false;
      }
    }
    return true;
  });

  if (loading) {
    return (
      <div className="loading" style={{ display: 'flex' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Loader */}
      <div className="loader fade-out">
        <div className="loader-content">
          <img src="https://i.postimg.cc/nrPsS29g/dd-cff.png" alt="ArchiveX Logo" className="loader-logo" />
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>
      <div className="red-line"></div>
      {/* Header */}
      <header>
        <div className="logo">
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <h1>ArchiveX</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#home">Главная</a></li>
            <li><a href="#clients">Клиенты</a></li>
            <li><a href="#about">О проекте</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </nav>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>ArchiveX</h1>
          <p>Архив актуальных клиентов DDNet и TeeWorlds</p>
          <a href="#clients" className="btn">Просмотреть клиенты</a>
        </div>
      </section>
      {/* Clients Section */}
      <section id="clients" className="clients">
        <h2>Доступные клиенты</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Поиск клиентов..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="filter-controls">
          <button className={`filter-btn${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>Все</button>
          <button className={`filter-btn${filter === 'teeworlds' ? ' active' : ''}`} onClick={() => setFilter('teeworlds')}>TeeWorlds</button>
          <button className={`filter-btn${filter === 'ddnet' ? ' active' : ''}`} onClick={() => setFilter('ddnet')}>DDNet</button>
          <button className={`filter-btn${filter === 'cheat' ? ' active' : ''}`} onClick={() => setFilter('cheat')}>Читы</button>
        </div>
        <div className="clients-container">
          {filteredClients.map((client, idx) => (
            <Card client={client} key={idx} />
          ))}
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="about">
        <h2>О проекте</h2>
        <p>
          ArchiveX - это архив актуальных версий клиентов для игр DDNet и
          TeeWorlds по состоянию на 27.06.2025. Мы собираем и поддерживаем
          коллекцию клиентов, чтобы игроки могли найти нужные им варианты в одном
          месте.
        </p>
        <p>
          Наша цель - предоставить полный и актуальный архив всех доступных
          клиентов для этих игр. Мы регулярно обновляем наш архив, добавляя новые
          клиенты и обновляя существующие версии.
        </p>
        <p>
          ArchiveX включает в себя клиенты для TeeWorlds и DDNet, в том числе те,
          которые содержат дополнительный функционал. Здесь вы найдете самые
          популярные клиенты, доступные на данный момент.
        </p>
      </section>
      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Контакты</h2>
        <p>По всем вопросам обращайтесь к нам в Telegram:</p>
        <div className="contact-links">
          <a href="https://t.me/i_s0o" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
            t.me/i_s0o
          </a>
          <a href="https://t.me/akrd1337" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
            t.me/akrd1337
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>© 2025 ArchiveX. Создатель: real_ueh</p>
          <div className="social-links">
            <a href="https://t.me/i_s0o" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </a>
            <a href="https://t.me/akrd1337" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {/* Scroll Top Button */}
      <div
        className={`scroll-top${showScroll ? ' active' : ''}`}
        onClick={handleScrollTop}
        style={{ cursor: 'pointer' }}
        aria-label="Scroll to top"
        tabIndex={0}
        role="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default App;