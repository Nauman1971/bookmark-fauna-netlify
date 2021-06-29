import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loader({ loading }) {
    return (
        <div className="mx-6 my-6">
            <PropagateLoader
                loading={loading}
                color="#36D7B7"
                css={override}
                size={20} />
        </div>
    )
}
