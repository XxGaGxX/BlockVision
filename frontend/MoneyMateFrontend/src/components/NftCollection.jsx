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

  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const res = await fetch(`http://localhost:8090/api/collections/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.banner_image_url) {
          data.banner_image_url = data.banner_image_url.replace("?", "?w=3840");
        }
        // console.log(data)
        setNftData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    getCollectionData();
  }, [id]);


  const handleRowClickNft = async (nftId, nftContract) => {
    const div = document.querySelector('.nft-collection')
    const banner = document.querySelector('.banner')

    try {
      const res = await fetch(`http://localhost:8090/api/item/ethereum/${nftContract}/${nftId}`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      data.nft.display_image_url = data.nft.display_image_url.replace("?w=500", "?w=3840");
      console.log(data.nft);
      const item = data.nft;
      const itemDiv = document.createElement('div');
      const itemnft = document.createElement('div');
      const nftData = document.createElement('div');
      itemDiv.className = 'item-div';
      itemnft.className = 'nft-item';
      nftData.innerHTML = `
  <button class='nft-close' onclick="document.querySelector('.nft-item').remove()">×</button>
  <div class='container'>
    <div class='row'>
      <div class='col-6 firstCol'>
        <img src='${item.display_image_url}' alt='nft'/>
      </div>
      <div class='col-6'>
        <h2>${item.name}</h2>
        <p>${item.description || 'No description available.'}</p>
        <a href='${item.permalink}' target='_blank'>View on OpenSea</a>
      </div>
    </div>
  </div>
`;
      
      itemnft.appendChild(nftData);

      div.insertBefore(itemnft, banner);
      // div.insertBefore(document.createElement('div')).innerHTML = `<div class='item-div'><div class='nft-item'></div></div>`, banner)

    } catch (error) {
      console.error("Error fetching NFT data:", error);

    }
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
        className="banner"
        style={{ backgroundImage: `url(${nftData.banner_image_url || nftData.image_url})` }}
      >
        <div className="banner-overlay">
          <img src={nftData.image_url} alt="collection" className="banner-logo" />
          <h1>{nftData.name}</h1>
          <div className="banner-details">
            <span>{nftData.created_date}</span>
            <span>{nftData.collection}</span>
            <span>Total Supply: {nftData.total_supply}</span>
            <span>{nftData.category}</span>
          </div>
        </div>
      </div>

      <div className="collection-details">
        {/* Optional details section */}
      </div>

      <div className="nft-grid">
        {nfts.length > 0 ? (
          nfts.map((nft, idx) => (
            nft.image_url == null ? null : (
              <div className="nft-card" key={idx} onClick={() => handleRowClickNft(nft.identifier, nft.contract)} >
                <img src={nft.image_url} alt={nft.name} className="nft-img" />
                <div className="nft-info">
                  <h2>{nft.name}</h2>
                  <p>{nft.description || 'No description available.'}</p>
                  <a href={nft.permalink} target="_blank" rel="noopener noreferrer">
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
