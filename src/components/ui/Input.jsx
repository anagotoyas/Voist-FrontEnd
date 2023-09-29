/* eslint-disable react/display-name */
import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <input
      type="text"
      className="bg-gray-100 px-3 py-2 block my-2 w-full"
      ref={ref}
      {...props}
    />
  );
});
