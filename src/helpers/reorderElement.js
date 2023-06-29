

export default function reorder(list, start, end) {
    const aux = [...list].filter((_, i) => i !== start)
    const removed = list[start]
    aux.splice(end, 0, removed);
    return aux;
}