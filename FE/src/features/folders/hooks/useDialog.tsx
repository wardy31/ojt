import { useState } from "react";

function useDialog() {
  const [dialog, setDialog] = useState(false);
  const handleDialog = (isOpen) => {
    setDialog(isOpen);
  };
  
  return {
    dialog,
    handleDialog,
  };
}

export default useDialog;
