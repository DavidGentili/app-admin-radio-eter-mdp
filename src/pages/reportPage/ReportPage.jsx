import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';

//Componets
import ReportPanel from './ReportPanel';
import NewReportPage from './NewReportPage';
import EditReportPage from './EditReportPage';
import ErrorPage from '../errorPage/ErrorPage';


//Helpers
import { sortElements } from '../../helpers/sortElements';

//Services
import { getReports } from '../../services/report';

//Hooks
import useMessage from '../../hooks/useMessage';

//Styles
import './reportPage.css'


const ReportPage = () => {


    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const navigate = useNavigate();
    const setMessage = useMessage();

    const refreshReports = () => {
        getReports()
        .then(( data ) => {
            setReports(data);
        })
        .catch(e => {
            setMessage(e);
        })
    }

    useEffect(() => {
        refreshReports()
    }, [])

    const selectReport = (report) => {
        return (e) => {
            setSelectedReport(report);
            navigate('./editar');
        }
    }

    const sortReports = sortElements(reports, setReports)


    return (
        <main className='reportPage'>
            <Routes >
                <Route path='nuevo' element={ <NewReportPage {...{refreshReports}} /> } /> 
                <Route path='' element={ <ReportPanel {...{ reports, selectReport, sortReports }} />} />  
                <Route path='editar' element={<EditReportPage {...{ selectReport }}/>  }/>
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>
        </main>
    )
}

export default ReportPage