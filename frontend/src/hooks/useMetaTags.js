import { useEffect } from 'react';

const useMetaTags = (metaTags, titleText) => {

    useEffect(() => {

        if (titleText != '') {

            metaTags.forEach(({ name, content }) => {
                let element = document.querySelector(`meta[name="${name}"]`);

                if (!element) {

                    // 
                    element = document.createElement('meta');
                    element.setAttribute('name', name);
                    document.head.appendChild(element);
                }

                if (name == 'keywords') {
                    // content = content + ' odds comparison, dropping odds, matched betting, compare sport odds, predictions nba, sports, betting lines, soccer, football, esports betting odds, tennis, nfl, premier league standing'
                    content = content
                }


                element.setAttribute('content', content);
            });

            let title = document.getElementsByTagName(`title`)[0];
            title.innerHTML = titleText

        }

    }, [metaTags]);
};

export default useMetaTags;