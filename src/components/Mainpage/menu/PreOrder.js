import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/mainpage.css';
import LoadingSpinner from '../LoadingSpinner';

function PreOrder() {
    const max = 100;

    const [data, getData] = useState([]);
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        console.log(limit)
    }, [limit])

    const fetchData = () => {
        setLoading(true);
        fetch('https://api.tvmaze.com/shows?_limit=30')
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    getData(response);
                    setLoading(false);
                }, 1500);
            })
    };

    const handleLimit = () => {
        if (limit <= max) {
            setLimit(limit + 15);
        }
    };

    return (
        <>
            {
                loading ? <LoadingSpinner /> :
                    <>
                        <h1>Pre-Order</h1>
                        <Container>
                            <Row>

                                {
                                    data.slice(50, 62).map((img, key) => {
                                        return (
                                            <div className="card-wrapper" key={key}>
                                                <a href="" className="card-content">

                                                    <div className="image-container">
                                                        <img
                                                            src={img.image.original}
                                                            alt=""
                                                            className='cardimg' />
                                                    </div>
                                                    <p className="movieTitle">{img.name}</p>
                                                </a>
                                            </div>

                                        );
                                    })
                                }
                            </Row>
                        </Container>
                    </>
            }
        </>
    );
}

export default PreOrder