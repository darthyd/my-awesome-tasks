export const findById = (id, array) => {
    return array.find(item => item.id === id)
};

export const deleteById = (id, array) => {
    const index = array.findIndex(item => item.id === id);
    array.splice(index, 1);
    return array
};

export const uniqid = (prefix = '') => {
    return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
}

export const updateById = (id, array, update) => {
    const index = array.findIndex(item => item.id === id);
    array[index] = {...array[index], ...update};
    return array
}