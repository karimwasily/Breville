function init() {
    const activeTab = document.querySelector('.cmp-tabs--secondary .cmp-tabs__tab--active');
    if(activeTab) {
        activeTab.classList.add('cmp-tabs__tab--show-arrow');
        activeTab.addEventListener('click', event => {  
            activeTab.classList.remove('cmp-tabs__tab--show-arrow');
            const tabs = document.querySelectorAll('.cmp-tabs--secondary .cmp-tabs__tab');
            tabs.forEach(tab => {
                tab.style.display = 'block';
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", init);