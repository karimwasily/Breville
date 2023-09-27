import tippy from 'tippy.js'; 

function getTextWithKeyword(keyword, text) {
    
    if(text.includes(keyword)) {
        const textSplit = text.split(" ");
        let textBefore = '';
        let textAfter = ' ';
        let keywordFound = false;

        textSplit.forEach(thisText => {
            if(thisText === keyword) {
                keywordFound = true;
            }
            else {
                if(!keywordFound) { textBefore = textBefore + thisText + ' '; }
                else { textAfter = textAfter + thisText + ' '; }
            }
        });
        return [textBefore, textAfter];
    }

    return;
}

const tooltipElements = document.getElementsByClassName('cmp-recipematerial__tooltip');
const tooltipIcons = document.getElementsByClassName('cmp-recipematerial__tooltip-icon');

for(let i = 0; i < tooltipElements.length; i++) {
    const tooltipElement = tooltipElements[i];
    const tooltipIcon = tooltipIcons[i];
    const textBeforeElement = tooltipElement.previousElementSibling;
    const textAfterElement = tooltipElement.nextElementSibling;

    const keyword = tooltipElement.dataset.keyword;
    const text = textBeforeElement.innerText;

    const tooltipContent = tooltipElement.children[0];
    if(keyword && text) {
        const [textBefore, textAfter] = getTextWithKeyword(keyword, text);
        textBeforeElement.innerHTML = textBefore ? textBefore : '';
        textAfterElement.innerHTML = textAfter ? textAfter : '';
    }

    const tooltipID = tooltipElement.id;
    const tooltipIconID = tooltipIcon.id;
    const content = tooltipContent.cloneNode(true);
    const iconContent = tooltipContent.cloneNode(true);
    new tippy('#' + tooltipID, {
        content: content,
        arrow: true,
        placement: 'top',
        hideOnClick: false,
        maxWidth: 350,
    });

    new tippy('#' + tooltipIconID, {
        content: iconContent,
        arrow: true,
        placement: 'top',
        hideOnClick: false,
        maxWidth: 350,
    });
}
