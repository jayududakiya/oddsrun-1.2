import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import style from "./article.module.css";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { stringToSlug } from "../../data/formater";
import PostRequest from "../../services/PostRequest";
import moment from "moment";
import { toast } from "react-toastify";
import { ASSETS_URL } from "../../config/Api_Url";
import Loading from "../../Loader/Loading";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //console.log("articles", articles);

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const response = await PostRequest("/articles");

      //console.log("response", response);

      setArticles(response);
    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Default>
      <div className="mb-5 container">
        {/* {isLoading ? (
          <Loading height={"50px"} width={"50px"} />
        ) : ( */}
        {/* // )} */}
        <Row>
          {articles.map((article, index) => (
            <Col md={4} key={index}>
              <NavLink
                to={`/article-details/${stringToSlug(article.title)}/${
                  article._id
                }`}
              >
                <div className={`${style.cardBg} mb-2`}>
                  {isLoading ? (
                    <Loading height={"50px"} width={"50px"} />
                  ) : (
                    <div>
                      <img
                        src={ASSETS_URL + article?.image}
                        className={style.cardImg}
                      />

                      <div className={style.date}>
                        {moment(article.createdAt).format("MMM DD,YYYY")}
                      </div>

                      <div className={style.title}>{article.title}</div>

                      <div className={style.description}>
                        {article.sortDesccription}
                      </div>
                    </div>
                  )}
                </div>
              </NavLink>
            </Col>
          ))}
        </Row>
      </div>
    </Default>
  );
};

export default Article;
