import './Card.css';

function Card({ client }) {
  return (
    <div className="client-card" data-type={client.dataType}>
      <div className="client-image">
        <img src={client.image} alt={client.name} />
        <span className="client-type">{client.type}</span>
      </div>
      <div className="client-info">
        <h3>{client.name}</h3>
        {client.buy ? (
          <a href={client.link} className="download-btn buy-btn" target="_blank" rel="noopener noreferrer">
            Купить
          </a>
        ) : (
          <>
            <a href={client.link} className="download-btn" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Скачать
            </a>
            {client.dnsDoc && (
              <a href={client.dnsDoc} className="download-btn dns-btn" target="_blank" rel="noopener noreferrer">
                Инструкция по DNS
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;