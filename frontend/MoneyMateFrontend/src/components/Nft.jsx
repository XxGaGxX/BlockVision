import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
function nft() {
    const location = useLocation();
    const contract = location.pathname.split('/')[2];
    const id = location.pathname.split('/')[3];
    const [nftData, setNftData] = useState(null);

    useEffect(() => {
        try {
            const getNftData = async () => {
                const res = await fetch(`http://localhost:8090/api/item/ethereum/${contract}/${id}`);
                if (!res.ok) throw new Error("Server error");
                const data = await res.json();
                data.nft.display_image_url = data.nft.display_image_url.replace("?w=500", "?w=3840");
                console.log(data.nft);
                setNftData(data.nft);
            }
            getNftData();
        } catch (e) {

        }
    }, [id, contract])


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 76px)"}}>
            {nftData && (
                <div className="container-fluid" style={{ width: "100%", display: "flex", padding:"0 7rem 0 7rem"}}>
                    <div className="row gx-0" style={{width: "100%" }}>
                        <div className="col" style={{ marginRight : "3rem"}}>
                            <img src={nftData.display_image_url} alt="NFT" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="col" style={{ marginLeft: "2rem" }}>
                            <div className="card" style={{ width: "100%", height: "100%", backgroundColor:"#141414", boxShadow: "0 0 0", color: "white", padding:"0"}}>
                                <div className="card-body">
                                    <h2 className="card-title">{nftData.name ? nftData.name : `${nftData.collection} #${nftData.identifier}`}</h2>
                                    <h6 className="card-text" style={{ marginTop: "1rem", display: "flex" }}>{nftData.collection} <p style={{ marginLeft: "0.5rem", display: "flex", color: "gray" }}>| Owned by</p> </h6> {/* TODO: get dell'owner */}
                                    <p style={{width:"100"}}>
                                        <button className='btn btn-dark-outline text-light'>{ nftData.collection }</button>
                                        <button className='btn btn-dark-outline text-light' >{ nftData.collection }</button>
                                        <button className='btn btn-dark-outline text-light'>{ `TOKEN #${nftData.identifier}` }</button>
                                    </p>
                                    <div className="finance"> {/* TODO: fare un get dei dati finanaziari, prendendo offerte */}
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col d-flex flex-column"></div>
                                                <div className="col d-flex flex-column"></div>
                                                <div className="col d-flex flex-column"></div>
                                                <div className="col d-flex flex-column"></div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col"></div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default nft
