import { useEffect, useState } from "react";
import api, { DataType } from "../api";

function useData() {
  const [state, setState] = useState<DataType[]>([]);

  useEffect(() => {
    api.list().then((res) => {
      setState(res);
    });
  }, []);

  return state;
}

export default useData;
