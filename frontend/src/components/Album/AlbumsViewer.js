

import "../PhotoStream/index.css"

function AlbumCatalogue() {


    return (
        <div className="photostream-container">
            <h2>Albums</h2>
            <div className="img-container">
                {Object.values(allPhotos).map(photo => {
                    return (
                        <Link key={photo.id} to={`/photos/${photo.id}`}>
                            <img className="photostream-img" src={photo.picSrc}></img>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
