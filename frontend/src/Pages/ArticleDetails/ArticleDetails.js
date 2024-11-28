import React, { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Default from "../../components/Default/Default";
import styles from "./articleDetails.module.css";
import PostRequest from "../../services/PostRequest";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { ASSETS_URL } from "../../config/Api_Url";
import Loading from "../../Loader/Loading";

const ArticleDetails = () => {
  const [articleDetails, setArticleDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const getArticleDetails = async () => {
    setIsLoading(true);
    try {
      const response = await PostRequest("/article/details", {
        _id: params.id,
      });

      setArticleDetails(response);
    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getArticleDetails();
  }, [params]);

  return (
    <Default>
      <div className="container mb-5">
        <div className={styles.articleBg}>
          <Row>
            {isLoading ? (
              <Loading height={"50px"} width={"50px"} />
            ) : (
              <div>
                <Col md={12}>
                  <h3>{articleDetails.title}</h3>
                  <Stack direction="horizontal" gap={4} className="mb-3">
                    <div className={styles.date}>
                      {moment(articleDetails.createdAt).format("MMM DD,YYYY")}
                    </div>
                  </Stack>
                  <div>
                    <img
                      src={ASSETS_URL + articleDetails?.image}
                      className={styles.cardImg}
                      alt={articleDetails.title}
                    />
                  </div>

                  <div className={styles.description}>
                    {articleDetails.sortDesccription}
                  </div>
                </Col>
                <div className="">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${articleDetails.fullDescriptions}</p>`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </Row>
        </div>
      </div>
    </Default>
  );
};

export default ArticleDetails;
