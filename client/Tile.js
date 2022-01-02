export const Tile = ({ children, evaluation }) => {
    let className = 'tile';
    switch (evaluation) {
        case 'c':
            className += ' correct';
            break;
        case 'p':
            className += ' present';
            break;
        case 'a':
            className += ' absent';
            break;
        default:
            break;
    }
    return (
        <div className={className}>
            {children}
        </div>
    );
};
