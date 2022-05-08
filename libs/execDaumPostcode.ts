import { Dispatch, SetStateAction } from "react";

const execDaumPostcode = (setAddress: Dispatch<SetStateAction<string>>) => {
  new (window as any).daum.Postcode({
    oncomplete: function (data: any) {
      const { address } = data;
      setAddress(address);
    },
  }).open();
};

export default execDaumPostcode;
