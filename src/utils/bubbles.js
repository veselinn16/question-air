const joinArrays = (arr1, arr2) => {
    return arr1.concat(arr2);
}

const applyClasses = (elements) => {
    elements.forEach((el, i) => {
        el.classList.add('bubble', `bubble-${i + 1}`);
    });
}

export default (arr1, arr2) => {
    const els = joinArrays(arr1, arr2);
    
    applyClasses(els);
}