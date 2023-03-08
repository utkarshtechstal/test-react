import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Stack from "components/common/Stack";
import AppBar from "components/common/AppBar";
import ToolBar from "components/common/ToolBar";
import IconButton from "components/common/IconButton";

const Header = (props) => {
    const {
        onLogoutClick,
    } = props;
    const classes = useStyles();

    return (
        <>
            <AppBar
                className={classes.appBarRoot}
                position="sticky"
                elevation={0}>
              

                <ToolBar className={classes.toolBarRoot}>
                    <Stack direction="row" spacing={1.5}>
                        <img src="/svgs/beta.svg" alt="BETA" />

                        <IconButton size="small" onClick={onLogoutClick}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </ToolBar>
            </AppBar>

        </>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        appBarRoot: {
            backgroundColor: `${theme.palette.background.paper} !important`,
            color: "#1e1e1e !important",
            flexDirection: "row",
            justifyContent: "space-between",
            [theme.breakpoints.up("lg")]: {
                justifyContent: "flex-end",
            },
            boxShadow: "0px 0px 10px #ebebeb",
        },

        toolBarRoot: {
            justifyContent: "flex-end",
        },
    })
);

export default React.memo(Header);
