import React, { useEffect, useState } from 'react'
import { getEpisodesOfPodcast, updateOrderOfEpisodes } from '../../../services/podcast';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SingleEpisode from './SingleEpisode';
import reorder from '../../../helpers/reorderElement';
import CustomButton from '../../../componets/generalComponents/CustomButton';
import useMessage from '../../../hooks/useMessage';

export default function EpisodeOfPodcastPanel({ id }) {

    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setLoading] = useState(false)

    const setMessage = useMessage();

    useEffect(() => {
        getEpisodesOfPodcast(id)
            .then(res => {
                const aux = [...res];
                aux.sort((a, b) => (a.order <= b.order) ? -1 : 1);
                setEpisodes(aux);
            })
            .catch(e => { })
    }, [])

    const dragEvent = (result) => {
        const { destination, source } = result;
        if (destination && destination.index !== source.index) {
            const aux = reorder(episodes, source.index, destination.index);
            aux.forEach((ep, i) => ep.order = i);
            setEpisodes(aux)
        }
    }

    const updateOrder = (e) => {
        setLoading(true);
        updateOrderOfEpisodes(episodes, id)
            .then((res) => {
                setMessage({ message: 'El orden de los episodios se ha actualizadon con exito', type: 'success' })
            })
            .catch(e => {
                setMessage({ message: e, type: 'success' })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className='episodeOfPodcastPanel'>
            <h4>Episodios del podcast</h4>
            <DragDropContext onDragEnd={dragEvent}>
                <Droppable droppableId='episodes'>
                    {({ droppableProps, innerRef, placeholder }) => (
                        <div className="body"
                            {...droppableProps}
                            ref={innerRef}>
                            {
                                episodes.map((ep, index) => {
                                    return (
                                        <Draggable key={ep.id} draggableId={ep.id} index={index}>
                                            {(draggableProvided) => (
                                                <SingleEpisode {...{ draggableProvided, ep }} />
                                            )}
                                        </Draggable>
                                    )
                                })
                            }
                            {placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
            <CustomButton onClickEvent={ updateOrder } buttonType='button' type='primary' loadingButton={isLoading} disabled={isLoading} >Actualizar orden</CustomButton>

        </div>
    )
}
