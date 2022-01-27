import s from './Button.module.css'
import propTypes from 'prop-types';

const Button = ({ name, action, children }) => {
  return (
    <button className={s.button} name={name} onClick={action}>{children}</button >
  )
}

Button.propTypes = {
  name: propTypes.string,
  action: propTypes.func,
  children: propTypes.string
}

export default Button;
