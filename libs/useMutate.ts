import { useState } from "react";
import checkAndMakeValidToken from "./checkAndMakeValidToken";

interface IUseMutateState<T> {
  loading: boolean;
  data?: T;
  error?: Object;
}

type useMutationResult<T> = [(data: any) => void, IUseMutateState<T>];

const useMutate = <T = any>(
  url: string,
  patch = false
): useMutationResult<T> => {
  const [state, setState] = useState<IUseMutateState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutate(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    if (!checkAndMakeValidToken()) {
      alert("로그인을 다시 해주십쇼");
      localStorage.removeItem("weKurly_access_token");
      localStorage.removeItem("weKurlyuser");
      location.href = "/enter";
      return;
    }
    fetch(url, {
      method: !patch ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": cookies.get("weKurly_access_token"),
        "x-access-token": localStorage.getItem("weKurly_access_token")
          ? JSON.parse(localStorage.getItem("weKurly_access_token")!)
          : "",
      },
      // credentials: "include",
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
