import React from 'react'

import CustomInput from '../../../componets/generalComponents/CustomInput'

export default function PodcastLinks({ spotify, youtube, google, soundcloud }) {
    return (
        <div className="links">
            <h6>Links</h6>
            <CustomInput
                name='spotify'
                placeholder='Spotify'
                value={spotify || ''}
            />
            <CustomInput
                name='youtube'
                placeholder='Youtube'
                value={youtube || ''}
            />
            <CustomInput
                name='google'
                placeholder='Google Podcast'
                value={google || ''}
            />
            <CustomInput
                name='soundcloud'
                placeholder='SoundCloud'
                value={soundcloud || ''}
            />
        </div>
    )
}
