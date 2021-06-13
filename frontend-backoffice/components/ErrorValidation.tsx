import React from "react";

export default ({ value }) => {
    if (!value) {
        return <></>;
    }

    return (<span className="text-red-500">{value}</span>);
}