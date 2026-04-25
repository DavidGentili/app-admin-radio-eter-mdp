import React, { useMemo } from 'react'
import SinglePlatformContent from '../../componets/singleComponents/SinglePlatformContent'
import ListPane from '../../componets/generalComponents/ListPane'

export default function ContentPanel({ contentList, sortContent, selectContent }) {


    const headers = [
        {
            command : 'name',
            field : 'Nombre',
        },
        {
            command : 'type',
            field : 'Tipo',
        },
        {
            command : 'content',
            field : 'Contenido',
        },
    ]

    const elements = useMemo(() => contentList.map(content => <SinglePlatformContent key={content.id} {...content} selectPlatformContent={selectContent(content)} />), [contentList])
    return <ListPane {...{ headers, elements, sortAction : sortContent }} />
}
