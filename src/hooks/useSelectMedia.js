import useModal from "./useModal";


export default () => {
    return (callback) => {
        useModal({ type : 'selectMedia', callback });
    }
}