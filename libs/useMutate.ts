import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useState } from "react";

interface IUseMutateState<T> {
  loading: boolean;
  data?: T;
  error?: Object;
}

type useMutationResult<T> = [(data: any) => void, IUseMutateState<T>];

const useMutate = <T = any>(url: string): useMutationResult<T> => {
  const [state, setState] = useState<IUseMutateState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutate(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((e) =>
        setState((prev) => ({ ...prev, error: e, loading: false }))
      );
  }
  return [mutate, { ...state }];
};

export default useMutate;
