/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";
import { useToast, ToastMessage } from "../../../hooks/toast";

import { Container } from "./styles";

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo />,
  error: <FiAlertCircle />,
  success: <FiCheckCircle />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {icons[message.type || "info"]}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle />
      </button>
    </Container>
  );
};

export default Toast;
