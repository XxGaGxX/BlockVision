import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./NftCollection.css";

const NftCollection = () => {
    const { id } = useParams();              // <-- qui prendi direttamente l’ID
    const [nftData, setNftData] = useState(null);
    const [error, setError] = useState(null);

    async function getCollectionData() {
        try {
            const res = await fetch(`http://localhost:8090/api/collections/nft/${id}`);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            console.log(data)
            setNftData(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    }

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
            <img src={nftData.collection.banner_image_url || nftData.collection.image_url} alt="Banner" className="banner" />
            <div className="details">
                <h1>{nftData.collection.name}</h1>
                <p>{nftData.collection.description}</p>
                <img src={nftData.collection.image_url} alt={nftData.collection.name} className="logo" />
                <p>Supply: {nftData.collection.total_supply}</p>
                <a href={nftData.collection.opensea_url} target="_blank">OpenSea</a>
            </div>
        </div>
    );
};

export default NftCollection;
