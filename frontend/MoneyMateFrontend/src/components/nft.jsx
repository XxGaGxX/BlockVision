import React, { useEffect, useState } from 'react';
import './nft.css';
import { useNavigate } from 'react-router-dom';
import { Rss, Search, Star, StarFill } from 'react-bootstrap-icons';

export default function Nft() {
  const [nftList, setNftList] = useState([]);
  const [next, setNext] = useState("");
  const navigate = useNavigate();

  async function getNft() {
    const url = "http://localhost:8090/api/collections"; // corretto
    try {
      const res = await fetch(url);
      const nftArray = await res.json();
      console.log(nftArray);

      setNftList(nftArray.collections || []);
      setNext(nftArray.next || "");
    } catch (err) {
      console.error("Errore nel fetch:", err);
    }
  }

  async function showMore() {
    const url = `http://localhost:8090/api/collections/${next}`;
    try {
      const res = await fetch(url);
      const nftArray = await res.json();
      if (!res.ok) {
        console.log(":(");
        return;
      }

      setNftList((prevList) => [...prevList, ...nftArray.collections]);
      setNext(nftArray.next);
    } catch (err) {
      console.error(err);
    }
  }

  const handleRowClickNft = (collectionId) => {
    navigate(`/nft/collections/${collectionId}`);
  };

  useEffect(() => {
    getNft();
  }, []);

  return (
    <div className="mainDivNftPage">
      <div className="titleDivNftPage cenHor">
        <h1>NFT Collections</h1>
      </div>
      <div className="nftCollectionsDiv">
        <table>
          <tbody>
            {nftList.map((col, index) => (
              <tr key={index} className="rownft" onClick={() => handleRowClickNft(col.collection)}>
                <td>{col.collection}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {next && (
          <button className="loadMoreBtn" onClick={showMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
