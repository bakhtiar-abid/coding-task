import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import api from "../../hooks/useAxios";

const Card = () => {
       const [details, setDetails] = useState([]);
       const [isLoading, setIsLoading] = useState(false);

       useEffect(() => {
          setIsLoading(true);
          api.get("/products")
             .then((response) => {
                setDetails(response.data);
                setIsLoading(false);
             })

             .catch((error) => {
                console.error("There was an error!", error);
             });
       }, []);
       const details1 = [
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
          {
             title: "name",
             img: "https://images.pexels.com/photos/14397947/pexels-photo-14397947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
             paraghraph: "helo"
          },
       ];
    return (
       <div className="container">
          <div className='row' >
             {details.map((detail) => {
                return (
                   <>
                      <Col
                         style={{
                            backgroundColor: "#f8f9fa",
                            margin: "10px",
                         }}
                         className="p-4"
                      >
                         <div className="d-flex">
                            <div>
                               <img width="150px" src={detail.img} alt="" />
                            </div>

                            <div className="ps-5 d-flex justify-content-center align-items-center">
                               <div>
                                  <h2>{detail.title}</h2>
                                  <p>{detail.paraghraph}</p>
                               </div>
                            </div>
                         </div>
                      </Col>
                   </>
                );
             })}
          </div>
       </div>
    );
};

export default Card;