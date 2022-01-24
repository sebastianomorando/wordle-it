import { useEffect, useState } from "react";

export const Nightmode = () => {

    const [nightmode, setNightmode] = useState(localStorage.getItem('nightmode') === 'true');
    const [colorblind, setColorblind] = useState(localStorage.getItem('colorblind') === 'true');

    useEffect(() => {
        if (nightmode) {
            document.body.classList.add('nightmode')
        } else {
            document.body.classList.remove('nightmode')
        }
        localStorage.setItem('nightmode', nightmode);
    }, [nightmode])

    useEffect(() => {
        if (colorblind) {
            document.body.classList.add('colorblind')
        } else {
            document.body.classList.remove('colorblind')
        }
        localStorage.setItem('colorblind', colorblind);
    }, [colorblind])

    return (
        <>
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
            <div className='menu-voice'>
                <h4>Alto contrasto</h4>
                <label className="switch-container">
                    <input
                        type='checkbox'
                        checked={colorblind}
                        onChange={() => {
                            setColorblind(!colorblind);
                        }}    
                    />
                    <div className="switch">
                        <span />
                    </div>
                </label>
            </div>
        </>
    )
}