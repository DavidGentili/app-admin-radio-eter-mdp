import useModal from './useModal';



export default () => {
    const setModal = useModal();
    return ({ text, callback }) => {
        setModal({ data : { text }, type : 'confirm', callback });
    }
}