import useModal from "./useModal";


export default () => {
    const setModal = useModal();
    return ({ callback }) => {
        setModal({ type : 'selectMedia', callback });
    }
}