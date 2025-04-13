import { useState } from "react";

function useDialog() {
  const [dialog, setDialog] = useState(false);

  const handleDialog = () => {    
    setDialog(!dialog);
  };

  return { dialog, handleDialog,setDialog };
}

export default useDialog;
