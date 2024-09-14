
import'./Header.scss'

const Header = () => {
  return (
    <header className=".header">
      <div className="logo__container">
        <div className="logo__wrapper">
          <img 
            src=""
            alt="Company logo" 
            className="logo" 
            loading="lazy"
          />
        </div>
      </div>
      <button className="icon__button" label="Menu">
        <img 
          src="" 
          alt="" 
          className="icon__image"
          loading="lazy"
        />
      </button>
    </header>
  );
};

export default Header;