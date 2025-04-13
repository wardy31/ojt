import { useState } from "react";

type CustomDialogProps = {
  name?: string;
};

function useData(state: CustomDialogProps) {
  const [data, setData] = useState<CustomDialogProps>(state);

  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClear = () => {
    for (const key in data) {
      setData({
        ...data,
        [key]: "",
      });
    }
  };
  return {
    data,
    handleDataChange,
    handleClear,
  };
}

export default useData;
