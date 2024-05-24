import React from 'react';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { fetchExchangeRates } from '../services/fxService';
import '../style/HomeComponent.css'; // CSS dosyasını import ettik

const HomeComponent = () => {
  const [rates, setRates] = React.useState(null);
  const [ratesBase, setRatesBase] = React.useState('');

  React.useEffect(() => {
    let componentIsMounted = true;

    const getFxData = () => {
      fetchExchangeRates()
        .then((data) => {
          console.log('fx data:', data);
          if (componentIsMounted) {
            setRates(data.rates);
            setRatesBase(data.base);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Başlangıçta verileri yükle
    getFxData();

    const fetchInterval = setInterval(getFxData, 1000 * 60);

    return () => {
      clearInterval(fetchInterval);
      componentIsMounted = false;
    };
  }, []);

  const currenciesToShow = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

  return (
    <div className="home-container">
      <HeaderComponent />
      <div className='screen-image'>
        <div className="content">
          <h1>Döviz Kurları</h1>
          {rates && ratesBase === 'USD' && (
            <div className="currency-cards">
              {currenciesToShow.map(currency => (
                <div key={currency} className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                  <strong>1 {currency} :</strong>
                  <span className="rate"> {rates[currency]} USD</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
