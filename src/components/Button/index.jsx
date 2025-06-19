import './Button.css';
const Button = ({message, disable}) => {
  return (
    <button className="button" disabled={disable} onClick={() => alert(message)}>
      {message}
    </button>
  );
}
export default Button;