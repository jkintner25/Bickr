import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { getUserAlbums } from "../../store/albums";
import './albumsViewer.css'

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

const CreateAlbumBtn = styled.button`
    /* position: absolute; */
    margin: 10px;
    border: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const AlbumTitle = styled.p`
    color: white;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
`;

function AlbumCatalogue() {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.session.user.id)

    const albums = useSelector((state) => {
        return Object.values(state.albums).filter((album) => {
            return album.userId === userId
        })
    })

    useEffect(() => {
        dispatch(getUserAlbums(userId))
    }, [userId])


    return (
        <Backgrnd>
            <div className="photostream-container">
                <h2>Albums</h2>
                <NavLink to="/newAlbum">
                    <CreateAlbumBtn>Create Album</CreateAlbumBtn>
                </NavLink>
                <div className="img-container">
                    {albums.map(album => {
                        return (
                            <div key={album.id}>
                                <Link to={`/albums/${album.id}`}>
                                    <img className="photostream-img" src="https://www.shoppingtill.co.uk/media/catalog/product/B/0/B00GO16NEQ1.jpg"></img>
                                </Link>
                                <AlbumTitle>{album.title}</AlbumTitle>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Backgrnd>
    );
}

export default AlbumCatalogue
