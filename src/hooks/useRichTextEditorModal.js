import useModal from "./useModal";


export default () => {
    const setModal = useModal();
    return ({ type, callback }) => {
        if(type === 'image' )
            setModal({ type : 'selectMedia', callback });
        if(type === 'video' || type === 'audio')
            setModal({ type: '', callback });
        if(type === 'link')
            setModal({ type : '', callback })
    }
}