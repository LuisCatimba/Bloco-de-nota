//Css

import styles from './Message.module.css';

interface IProps {
  message: string;
  isError: boolean;
}

const Message = ({ message, isError }: IProps) => {
  return (
    <div
      className={`${styles.message} ${isError ? styles.error : styles.success}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
