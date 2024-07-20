import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import DefaultLayout from "./../components/DefaultLayout";
import { ConfigContext } from '../context/ConfigContext';

const Homepage = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  // console.log(authToken);
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "Hot Drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/590/590836.png",
    },
    {
      name: "Cold Drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/4627/4627234.png",
    },
    {
      name: "Rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
    },
    {
      name: "Meat",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/1718/1718484.png",
    },
    {
      name: "Seafood",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/3082/3082055.png",
    },
    {
      name: "Noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(`${baseUrl}/item`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch, baseUrl, authToken]);
  
  return (
    <DefaultLayout>
            <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="60"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;