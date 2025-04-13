import { useEffect, useState } from "react";
import axiosConfig from "../../config/axios";

function useFetchFolders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: foldersData } = await axiosConfig.get(
        "/folders?isParent=true"
      );
      setData(foldersData);
    })();
  }, []);

  return { data, loading };
}

export default useFetchFolders;
