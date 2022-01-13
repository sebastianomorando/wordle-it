import { useEffect, useState } from "react";

export const Nightmode = () => {

    const [nightmode, setNightmode] = useState(localStorage.getItem('nightmode') === 'true');

    useEffect(() => {
        if (nightmode) {
            document.body.classList.add('nightmode')
        } else {
            document.body.classList.remove('nightmode')
        }
        localStorage.setItem('nightmode', nightmode);
    }, [nightmode])

    return (
        <div className='menu-voice'>
            <h4>Nightmode</h4>
            <label className="switch-container">
                <input
                    type='checkbox'
                    checked={nightmode}
                    onChange={() => {
                        setNightmode(!nightmode);
                    }}    
                />
                <div className="switch">
                    <span />
                </div>
            </label>
        </div>
    )
}