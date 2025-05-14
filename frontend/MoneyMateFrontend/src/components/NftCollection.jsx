import React, { useEffect, useState } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';
import './NftCollection.css';

const NftCollection = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const [nftData, setNftData] = useState(null);
  const [error, setError] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [nextNfts, setNextNfts] = useState('');
  const navigate = useNavigate()
  const [collectionStats  , setCollectionStats] = useState(null);

  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const res = await fetch(`http://localhost:8090/api/collections/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.banner_image_url) {
          data.banner_image_url = data.banner_image_url.replace("?", "?w=3840");
        }
        console.log(data)
        setNftData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    getCollectionData();
  }, [id]);

  useEffect(() => { 
    const getCollectionStats = async () => {
      try {
        const res = await fetch(`http://localhost:8090/api/collections/${id}/stats`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        console.log(data)
        setCollectionStats(data);
      } catch (e) {
        setError(e.message);
      }
    };

    getCollectionStats();
  },[id])

  const handleRowClickNft = async (nftId, nftContract) => {
    const div = document.querySelector('.nft-collection')
    const banner = document.querySelector('.banner')
    navigate(`/nft/${nftContract}/${nftId}`);
  }

  useEffect(() => {
    const getCollectionNfts = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/collections/${id}/nfts`);
        if (!response.ok) throw new Error("Errore server");
        const data = await response.json();
        setNfts(data.nfts);
        setNextNfts(data.next);
      } catch (e) {
        console.error(e);
      }

    };

    getCollectionNfts();
  }, [id]);



  useEffect(() => {
    console.log(nfts);
  }, [nfts])

  if (error) return <div className="error">Errore: {error}</div>;
  if (!nftData) return <div>Loading...</div>;

  return (
    <div className="nft-collection">
      <div
        className="banner d-flex flex-column justify-content-center align-items-center"  
        style={{ backgroundImage: `url(${nftData.banner_image_url || nftData.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="banner-overlay ">
          <img src={nftData.image_url} alt="collection" className="banner-logo" />
          <h1>{nftData.name}</h1>
          <div className="banner-details">
            <span>{nftData.created_date}</span>
            <span>{nftData.collection}</span>
            <span>Total Supply: {nftData.total_supply}</span>
            <span>{nftData.category}</span>
          </div>
        </div>
        <div className="banner-stats bg-success mt-3 d-flex justify-content-center align-items-center">
          <div className="stats-item">
            <div className="floor d-flex flex-column">
              <p>FLOOR PRICE</p>
            </div>
          </div>
        </div>

      </div>

  

      <div className="nft-grid" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between', width: '100%', marginTop: '4rem'}}>
        {nfts.length > 0 ? (
          nfts.map((nft, idx) => (
            nft.image_url == null ? null : (
              <div className="nft-card" key={idx} onClick={() => handleRowClickNft(nft.identifier, nft.contract)} >
                <img src={nft.display_image_url || nft.image_url} alt={nft.name} className="nft-img" />
                <div className="nft-info">
                  <h2>{nft.name}</h2>
                  <p>{nft.description || 'No description available.'}</p>
                  <a href={nft.permalink} target="" rel="noopener noreferrer">
                    View on OpenSea
                  </a>
                </div>
              </div>
            )
          ))
        ) : (
          <p>No NFTs available.</p>
        )}
      </div>
    </div>
  );
};

export default NftCollection;
