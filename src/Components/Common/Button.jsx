import Button from '@mui/material/Button';
import React from 'react'

const Buttons=(props) =>{
  const {
    children,
    title = "-",
    variant = "contained",
    size,
    color = "primary",
    loading = false,
    onClick = () => {
      console.log("clicked");
    },
    endIcon,
    startIcon,
    ...restProps
  } = props;
  const buttonStyle = {
    default: {},
    primary: {
      // color: "#fff",
      // borderRadius: "22px",
      // paddingHorizontal: "32px",
    },
  };
  

return(
  <Button
      variant={variant}
      size={size}
      onClick={onClick}
      color={color}
      loading={loading}
      // loadingPosition="start"
      endIcon={endIcon}
      startIcon={startIcon}
      style={buttonStyle[color] || buttonStyle["default"]}
      {...restProps}
    >
      {children || title}
    </Button>
)

}
 

export default React.memo(Buttons);