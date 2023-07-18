const animateCSS = (element, animation) =>

    new Promise((resolve, reject) => {
        const animationName = `${animation}`;
        // const node = document.querySelector(element);
        const node=element
        node.classList.add(`animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

function reloadData() {

    let dataContainer = document.querySelector('.dataContainer')
    let dataElement = document.createElement('div')

    dataElement .classList.add('data')
    dataContainer.appendChild(dataElement)
    animateCSS(dataElement,'jackInTheBox')
}