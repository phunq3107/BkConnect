import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import teacherImage from "../../../assets/images/teacher.png"
import logoBK from "../../../assets/images/logoBK.png"
import {app_colors} from "../../../constants"
function LeftBanner(props) {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundRepeat: 'no-repeat',
                backgroundColor: app_colors._loginBanner,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Stack alignItems={"center"}>
                <Stack flexDirection={"row"} pt={2}>
                    <Box
                        component="img"
                        sx={{
                            height: 65,
                            width: 70,
                        }}
                        src={logoBK}
                    />
                    <Typography variant="title1" fontSize={50} fontWeight="bold" color={app_colors._whiteText}>
                        BKConnect
                    </Typography>
                </Stack>
                <Box
                    component="img"
                    sx={{
                        height: 530,
                        width: 570,
                        maxHeight: { xs: 740, md: 540},
                        maxWidth: { xs: 760, md: 560}
                    }}
                    src={teacherImage}
                />
                <Typography variant="title2" fontSize={50} fontWeight="semiBold" color={app_colors._whiteText}>
                    Kết nối gia sư và học viên
                </Typography>
                <Typography variant="title2" fontSize={45} fontWeight="semiBold" color="#FCCF14">
                    Nhanh chóng & phù hợp
                </Typography>
            </Stack>

        </Grid>
    );
}

export default LeftBanner;