import { useLayoutEffect, useState, useRef } from "react";

export const Tile = ({ children, evaluation, index }) => {
    
    const [className, setClassName] = useState('tile');
    const el = useRef(null);

    useLayoutEffect(() => {
        el.current.addEventListener('animationend', () => {
            setClassName((className) => className.replace(' turn', ' nurt'));
            switch (evaluation) {
                case 'c':
                    setClassName('tile nurt correct');
                    break;
                case 'p':
                    setClassName('tile nurt present');
                    break;
                case 'a':
                    setClassName('tile nurt absent');
                    break;
                default:
                    break;
            }
        });
        if (evaluation !== ' ') {
            setClassName('tile filled turn');
        }
    }, [evaluation]);
        
    useLayoutEffect(() => {
        if (children === ' ') {
            setClassName((className) => className.replace(' filled', ''));
        } else {
            setClassName((className) => className + ' bounce filled');
            el.current.addEventListener('animationend', () => {
                setClassName((className) => className.replace(' bounce', ''));
            });
        }
       
    }, [children]);

    return (
        <div
            className={className}
            ref={el}
            style={{
                animationDelay: className.indexOf('turn') > - 1 ? `${index * 0.1}s`: '0s'
            }}>
                {children}
        </div>
    );
};
