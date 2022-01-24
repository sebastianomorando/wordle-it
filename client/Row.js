import { useLayoutEffect, useRef, useState } from 'react';
import { useStore } from './state';

export const Row = ({ children, index }) => {

    const { state, dispatch } = useStore();
    const el = useRef(null);
    const [className, setClassName] = useState('row');

    useLayoutEffect(() => {
        if (state.currentRow === index && state.error === 'row') {
            setClassName('row shake');
            el.current.addEventListener('animationend', () => {
                setClassName((className) => className.replace(' shake', ''));
                dispatch({ type: 'CLEAR_ERROR' });
            });
        }
    }, [state.currentRow, state.error]);
    
    return (
        <div className={className} ref={el}>
            {children}
        </div>
    )
}
