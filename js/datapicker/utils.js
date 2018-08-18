export default function(tag, className, content) {
    var el = document.createElement(tag);

    if (className){
        el.classList.add(className);
    }
    if(content){
        el.innerHTML = content;
    }
    return el;
}