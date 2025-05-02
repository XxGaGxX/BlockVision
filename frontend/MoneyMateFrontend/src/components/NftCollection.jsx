import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./NftCollection.css";
import { useLocation } from 'react-router-dom';

const NftCollection = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[3] //ERROR : inserire sempre il carattere dello split diego
    const [nftData, setNftData] = useState([]);
    const [error, setError] = useState(null);
    let urlImage = ""

    async function getCollectionData() {
        try {
            console.log(id)
            const res = await fetch(`http://localhost:8090/api/collections/collection/${id}`);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            if (data.banner_image_url) {
                data.banner_image_url = data.banner_image_url.replace(
                    "?",
                    "?w=3840"
                );
            }
            console.log(data.banner_image_url)
            
            setNftData(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    }

    useEffect(() => {
        // console.log(nftData.banner_image_url.substring(127))
    }, [nftData])

    useEffect(() => {
        getCollectionData();
        // console.log(nftData.banner_image_url)
        // urlImage = nftData.banner_image_url
        // console.log(nftData.banner_image_url.substring(143))
    }, [id]);

    if (error) {
        return <div className="error">Errore: {error}</div>;
    }
    if (!nftData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="nft-collection">
            <div className="header">
                <div
                    className="bannerImageDiv"
                    style={{
                        backgroundImage: `url(${nftData.banner_image_url && nftData.banner_image_url.trim() !== ""
                            ? nftData.banner_image_url
                            : nftData.image_url})`,
                    }}
                >
                    <h1><img src={nftData.image_url} style={{width:"50px", marginRight:"20px"}} alt="" />{nftData.name}</h1>
                    <div className="details_banner">
                        <button className='btn btn-outline-light'>{ nftData.created_date }</button>
                        <button className='btn btn-outline-light'>{ nftData.collection }</button>
                        <button className='btn btn-outline-light'>Total Supply : { nftData.total_supply }</button>
                    </div>
                </div>
                
            </div>
            
            <div className="details">
                
                <p>{nftData.description}</p>
                {/* <img src={nftData.image_url} alt={nftData.collection.name} className="logo" /> */}
                {/* <a href={nftData.collection.opensea_url} target="_blank">OpenSea</a> */}
            </div>
        </div>
    );
};

export default NftCollection;
