import './albumsViewer.css'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteAlbum } from '../../store/albums';


const Backgrnd = styled.div`
    position: absolute;
    background-color: #212124;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const DeleteButton = styled.button`
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

function SingleAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const album = useSelector(state => state.albums[id]);

    const allPhotos = Object.values(useSelector(state => state.photos))

    const photos = allPhotos.filter(photo=>photo.albumId === Number(id))

    const onDelete = () => {
        dispatch(deleteAlbum(id))
        history.push('/albums')
    }

    return (
        <Backgrnd>
            <DeleteButton onClick={onDelete}>Delete This Album</DeleteButton>
            <div className="photostream-container">
                <h2>{album?.title}</h2>
                <div className="img-container">
                    {photos?.map(photo => {
                        return (
                            <Link key={photo?.id} to={`/photos/${photo?.id}`}>
                                <img className="photostream-img" src={photo?.picSrc}></img>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </Backgrnd>
    );
}

export default SingleAlbum;
