import React, { ReactElement, FC } from "react";
import { Button, Container } from '@mui/material'

interface Props {
    title: String
}

const Header: FC<any> = (): ReactElement => {
    return (
        <Container>
            {'Header'}
            <Button>Test</Button>
        </Container>
    );
};

export default Header;