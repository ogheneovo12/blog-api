import { useState } from "react";

export const useAlertState = () => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    description: "",
    onAccept: () => {},
  });

  const openAlert = (state) => {
    setAlertState({ isOpen: true, ...state });
  };

  const closeAlert = () => {
    setAlertState({
      isOpen: false,
      title: "",
      description: "",
      onAccept: () => {},
    });
  };

  return { openAlert, closeAlert, alertState };
};
