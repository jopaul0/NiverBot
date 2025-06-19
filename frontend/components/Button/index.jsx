import './Button.css';
const Button = ({message}) => {
  return (
    <button className="button">
      {message}
    </button>
  );
}
export default Button;