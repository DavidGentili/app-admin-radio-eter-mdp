import React, { useEffect, useState } from 'react';


import './mediaPage.css';

import MediaPanel from '../../componets/mediaPanel/MediaPanel';
import ModalContainer from '../../componets/modals/ModalContainer';


const MediaPage = () => {


    return (

        <main className="mediaPage">
            <MediaPanel/>
        </main>

    )
}

export default MediaPage;