import './Button.css';

const Button = ({ message, disable, onClick }) => {

  return (
    <button className="button" disabled={disable} onClick={onClick}>
      {message}
    </button>
  );
}
export default Button;