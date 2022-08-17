import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import PostSheare from './../PostSheare/PostSheare';

const ShereModal = ({ openModal, setOpenModal }) => {
    const theme = useMantineTheme();
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='50%'
            opened={openModal}
            onClose={() => setOpenModal(false)}
        >
            <PostSheare></PostSheare>
        </Modal>
    );
};


export default ShereModal;