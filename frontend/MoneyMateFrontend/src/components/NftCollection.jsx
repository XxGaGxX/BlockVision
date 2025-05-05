import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./NftCollection.css";
import { useLocation } from 'react-router-dom';

const NftCollection = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[3] //ERROR : inserire sempre il carattere dello split diego
    const [nftData, setNftData] = useState([]);
    const [error, setError] = useState(null);
    const [nfts, setNfts] = useState([])
    let urlImage = ""

    async function getCollectionData() {
        try {
            console.log(id)
            const res = await fetch(`http://localhost:8090/api/collections/${id}`);
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
            
            setNftData(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    }

    async function getCollectionNfts() {
        try {
            const response = await fetch(`http://localhost:8090/api/collections/${id}/nfts`)
            if (!response.ok) { throw new Error("Errore server") }
            else {
                const data = await response.json()
                setNfts(data)
            }
        }catch(e) {console.error(e)}
    }

    useEffect(() => {
        getCollectionNfts()
    }, [id])

    useEffect(() => {
        console.log(nfts)
    })

    useEffect(() => {
        getCollectionData();

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
                        <button className='btn btn-outline-light'>Total Supply : {nftData.total_supply}</button>
                        
                    </div>
                    
                </div>
                
            </div>
            
            <div className="details">
                {/* TODO aggiungi i dettagli degli NFT */}
                <p>{nftData.description}</p>
                {/* <img src={nftData.image_url} alt={nftData.collection.name} className="logo" /> */}
                {/* <a href={nftData.collection.opensea_url} target="_blank">OpenSea</a> */}
            </div>

            <div className="nfts container text-center">
                {nfts.length > 0 ? (
                    <div className="row">
                        {nfts.map((nft, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4 shadow-sm">
                                    <img
                                        src={nft.image_url}
                                        className="card-img-top"
                                        alt={nft.name}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{nft.name}</h5>
                                        <p className="card-text">{nft.description || "No description available."}</p>
                                        <a
                                            href={nft.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            View on OpenSea
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No NFTs available.</p>
                )}
            </div>
        </div>
    );
};

export default NftCollection;
