import React from "react";

import useKeydown from "../../hooks/useKeydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  // This can me memoized to avoid creating a new function on every render.
  const handleKeydown = React.useCallback(function (event) {
    if (event.key === "Escape") {
      setToasts([]);
    }
  });

  useKeydown(handleKeydown);

  function createToast(message, variant) {
    // I need to create a new array of toasts, set it as the new state, and then reset
    // the message and variant state values.
    const newToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
