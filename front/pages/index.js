import React from "react";
import AppLayout from "../components/AppLayout";
import MainCon from "../components/main/mainCon";
import { Container } from "../style/ContentStyle";

const index = () => {
    return (
        <AppLayout>
            <Container>
                <MainCon />
            </Container>
        </AppLayout>
    );
};

export default index;
