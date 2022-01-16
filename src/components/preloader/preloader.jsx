import styleLoader from '"./preloader.module.css"';

function Preloader() {

    return(
        <div className={styleLoader.container}>
            <p className={styleLoader.title}>ЗАГРУЗКА</p>
        </div>
    )
}