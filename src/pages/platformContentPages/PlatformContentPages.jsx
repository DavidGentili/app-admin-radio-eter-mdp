import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

//Components
import ErrorPage from '../errorPage/ErrorPage'
import ContentPanel from './ContentPanel'
import EditContentPanel from './EditContentPanel'
// import NewContentPanel from './NewContentPanel'

//Services
import { getContent } from '../../services/content'

//Helpers
import { sortElements } from '../../helpers/sortElements'

//hooks 
import useMessage from '../../hooks/useMessage'

//Styles
import './platformContentPages.css'



export default function PlatformContentPages() {

    const [contentList, setContentList] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const navigate = useNavigate();
    const setMessage = useMessage();

    const refreshContent = () => {
        getContent()
            .then((data) => {
                setContentList(data);
                if(selectedContent) {
                    const updatedContent = data.find(content => content.id === selectedContent.id);
                    setSelectedContent(updatedContent || null);
                }
            })
            .catch(e => {
                setMessage(e);
            })
    }

    const selectContent = (content) => {
        return (e) => {
            setSelectedContent(content);
            navigate('./editar');
        }
    }

    useEffect(() => {
        refreshContent()
    }, [])


    const sortContent = sortElements(contentList, setContentList)

    return (
        <main className='platformContentPages'>
            <Routes >
                {/* <Route path='nuevo' element={<NewContentPanel />} /> */}
                <Route path='' element={<ContentPanel {...{ contentList, sortContent, selectContent }} />} />
                <Route path='editar' element={<EditContentPanel {...{ selectedContent, refreshContent }} />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </main>
    )
}