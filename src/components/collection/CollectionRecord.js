import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CollectionRecord = () => {
    const [records, setRecord] = useState([])
    const { recordId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/collection/${recordId}?_expand=record&expand=user&_sort=recordId`)
                .then(res => res.json())
                .then((recordData) => {
                    setRecord(recordData)
                })
        },
        [recordId]  // Above function runs when the value of ticketId change
    )

    return (
        <>

            <section className="collectionRecord">
      
                    <div className="collectionRecordContainer" key={`collectionRecord--${records.id}`}>
                        <ul>
                            <li key={`collectionRecordItem--${records.id}`}>

                                <h3>{records.record?.album}</h3>

                                <p>{records.record?.artist}</p>
                                <img className="cover" alt="albumCover" src={records.record?.albumCover} />
                                <p>Cataloge #: {records.record?.catalogNumber}</p>
                                <p>Value: {records.record?.value}</p>
                                <p>Release Date: {records.record?.releaseDate}</p>
                                <p>Rating: {records.record?.rating}/5</p>
                            </li>

                        </ul>


                    </div>
         


            </section>
        </>
    )
}