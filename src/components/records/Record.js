import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Record = () => {
    const [records, setRecord] = useState([])
    const { recordId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/crate/${recordId}?_expand=record&expand=user&_sort=recordId`)
                .then(res => res.json())
                .then((recordData) => {
                    setRecord(recordData)
                })
        },
        [recordId]  // Above function runs when the value of ticketId change
    )

    return (
        <>

            <section className="crateRecord">
      
                    <div className="crateRecordContainer" key={`crateRecord--${records.id}`}>
                        <ul>
                            <li key={`crateRecordItem--${records.id}`}>

                                <h3>{records.record?.album}</h3>

                                <p>{records.record?.artist}</p>
                                <img className="cover" alt="albumCover" src={records.record?.albumCover} />
                            </li>

                        </ul>


                    </div>
         


            </section>
        </>
    )
}