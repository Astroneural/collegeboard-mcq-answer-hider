function removeFlagsAndIcons() {
    document.querySelectorAll('.mcq-option').forEach(option => {
        option.className = option.className
            .replace('--correct', '')
            .replace('--incorrect', '')
            .trim();

        const letterDiv = option.querySelector('.letter');
        if (letterDiv) {
            letterDiv.className = letterDiv.className.replace('--chosen', '').trim();
        }

        const ariaLabel = option.getAttribute('aria-label');
        if (ariaLabel) {
            option.setAttribute(
                'aria-label',
                ariaLabel
                    .replace(/Rationale: Correct.*$/, '')
                    .replace(/Rationale: Incorrect.*$/, '')
                    .trim()
            );
        }

        const icon = option.querySelector('.icon.--correct, .icon.--incorrect');
        if (icon && icon.parentElement) {
            icon.parentElement.removeChild(icon);
        }
    });

    document.querySelectorAll('.LearnosityDistractor').forEach(distractor => {
        distractor.style.display = 'none';
    });
}

chrome.storage.sync.get(['cbAnswerHiderEnabled'], (result) => {
    if (result.cbAnswerHiderEnabled) {
        removeFlagsAndIcons();

        const observer = new MutationObserver(removeFlagsAndIcons);
        observer.observe(document.body, { childList: true, subtree: true });
    }
});