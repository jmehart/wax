import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Record = () => {
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

            <section className="Record">

                <div className="RecordContainer" key={`Record--${record.id}`}>
                    <ul>
                        <li className="aRecord" key={`RecordItem--${record.id}`}>

                            <p>Album: <h3>{record.album}</h3></p>

                            <p>Artist: <h4>{record.artist}</h4></p>
                            
                            <img className="cover" alt="albumCover" src={record.albumCover} />
                            <p>Catalog #: <b>{record.catalogNumber}</b></p>

                            <p>Genre: <b>{record.genre?.genre}</b></p>

                            {record.value &&
                                <p>Value: <b>{record.value}</b></p>
                            }

                            {record.releaseDate &&
                                <p>Release Date: <b>{record.releaseDate}</b></p>
                            }
                            {record.rating &&
                                <p>Rating: <b>{record.rating}</b>/5</p>
                            }
                        </li>

                    </ul>


                </div>



            </section>
        </>
    )
}