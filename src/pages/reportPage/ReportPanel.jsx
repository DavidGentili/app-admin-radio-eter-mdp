import React from 'react'

//Componets
import ListPane from '../../componets/generalComponents/ListPane'
import SingleReport from '../../componets/singleComponents/SingleReport'


const ReportPanel = ({ reports, selectReport, sortReports }) => {

    const headers = [
        {
            command : 'title',
            field : 'Titulo',
        },
        {
            command : 'active',
            field : 'Publicado',
        },
        {
            command : 'creatorName',
            field : 'Creador',
        },
        {
            command : 'lastModify',
            field : 'Ultima modificacion',
        },
    ]

    const elements = reports.map(report => <SingleReport key={report.id} {...report} selectReport={selectReport(report)} /> )

    return <ListPane {...{ headers, elements, sortAction : sortReports}} />
}

export default ReportPanel