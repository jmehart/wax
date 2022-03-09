import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CrateRecord = () => {
    const [record, setRecord] = useState([])
    const { recordId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/records/${recordId}?_expand=genre`)
                .then(res => res.json())
                .then((recordData) => {
                    setRecord(recordData)
                })
        },
        [recordId]  // Above function runs when the value of ticketId change
    )

//      {record.releaseDate.length > 0 && }

    return (
        <>

            <section className="crateRecord">

                <div className="crateRecordContainer" key={`crateRecord--${record.id}`}>
                    <ul>
                        <li key={`crateRecordItem--${record.id}`}>

                            <h3>{record.album}</h3>

                            <p>{record.artist}</p>
                            <img className="cover" alt="albumCover" src={record.albumCover} />
                            <p>Catalog #: {record.catalogNumber}</p>
    
                            <p>Genre: {record.genre?.genre}</p>

                         
                                <p>Value: {record.value}</p>
                            
                           
                                <p>Release Date: {record.releaseDate}</p>
                            
                     
                                <p>Rating: {record.rating}/5</p>
                         
                        </li>

                    </ul>


                </div>



            </section>
        </>
    )
}