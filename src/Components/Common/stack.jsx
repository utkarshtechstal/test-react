import React from "react";
import MStack from '@mui/material/Stack';

const Stack = (props) => {
    return (
        <MStack padding="0" {...props} />
    )
}

export default React.memo(Stack);