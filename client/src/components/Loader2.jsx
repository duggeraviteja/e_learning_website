import React, { useState } from "react";
import { css } from "@emotion/react";

import ClipLoader, {
  ClockLoader,
  HashLoader,
  FadeLoader,
} from "react-spinners";

export default function Loader2() {

    const override = css`
    size: 150px;
  heigt : 150px;
  width : 50px;
  radius : 10px;
  margin :10px;
  border-color: red;
`;
  return (
    <div>
      <div className="text-center align-items-center ">
        <FadeLoader css={override}   color="cyan"className="mx-auto my-auto" />
      </div>
    </div>
  );
}
