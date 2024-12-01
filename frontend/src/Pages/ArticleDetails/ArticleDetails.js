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

const articlesDetailsSchemaMarkups = [
  {
    id: "6723a82deefe2529cc4b204f",
    slug: "are-paid-tips-worth-it-",
    headline: "Are Paid Betting Tips Worth It? Sports Betting Insights",
    description:
      "Explore if paid betting tips offer real value in sports betting. Get insights on tipster services, odds comparisons, and expert predictions for football, tennis, basketball, and esports.",
    image: "https://oddsrun.com/images/image-1730389984710.png",
    datePublished: "2024-10-31",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/are-paid-tips-worth-it-/6723a82deefe2529cc4b204f",
  },
  {
    id: "67236cf7eefe2529cc4b128e",
    slug: "finding-the-best-odds",
    headline: "Best Sports Betting Odds: Maximize Profits on Football & More",
    description:
      "Boost your sports betting profits by finding top odds on football, tennis, basketball, and esports. Compare bookmakers to gain an edge with the highest betting odds.",
    image: "https://oddsrun.com/images/image-1730374887557.png",
    datePublished: "2024-10-31",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/finding-the-best-odds/67236cf7eefe2529cc4b128e",
  },
  {
    id: "66a402364de18bbf06008f3d",
    slug: "best-tennis-betting-lines",
    headline: "Best Tennis Betting Lines - Compare Odds for Max Profits",
    description:
      "Find top tennis betting lines and maximize winnings. Use OddsRun to compare odds from leading bookmakers for Grand Slams and ATP/WTA events. Bet smarter today!",
    image: "https://oddsrun.com/images/image-1730374039391.jpg",
    datePublished: "2024-07-26",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/best-tennis-betting-lines/66a402364de18bbf06008f3d",
  },
  {
    id: "6654313afe967ccdad404fe2",
    slug: "comparing-betting-odds",
    headline: "Compare Betting Odds - Best Value & Profits in Sports Betting",
    description:
      "Maximize sports betting profits by comparing odds across top bookmakers. Find best odds, reduce margins, and explore arbitrage in football, tennis, basketball, and esports.",
    image: "https://oddsrun.com/images/image-1716793529056.png",
    datePublished: "2024-05-27",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/comparing-betting-odds/6654313afe967ccdad404fe2",
  },
  {
    id: "664d0e315a95874e8bdf477b",
    slug: "how-to-beat-the-bookmaker",
    headline: "How to Beat the Bookmaker - Smart Betting Tips & Strategies",
    description:
      "Boost your sports betting success with research, bankroll management, value bets, and advanced strategies to beat the bookmaker. Bet smarter and improve your profits.",
    image: "https://oddsrun.com/images/image-1716325916323.webp",
    datePublished: "2024-05-22",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/how-to-beat-the-bookmaker/664d0e315a95874e8bdf477b",
  },
  {
    id: "664a22eab71db23ecff9d974",
    slug: "understanding-handicaps-in-sports-betting",
    headline: "Understanding Handicaps in Sports Betting - Complete Guide",
    description:
      "Learn how handicap betting works and its benefits in sports like football and basketball. Discover Asian, European, and spread betting to improve your strategy.",
    image: "https://oddsrun.com/images/image-1716134603161.png",
    datePublished: "2024-05-19",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/understanding-handicaps-in-sports-betting/664a22eab71db23ecff9d974",
  },
  {
    id: "663e728bf634d43053ace4cb",
    slug: "understanding-bookmakers-margin",
    headline: "Understanding Bookmakers Margin in Sports Betting",
    description:
      "Learn how bookmakers' margin impacts odds and betting outcomes. Understand its significance and how to use it to make smarter, more profitable sports bets.",
    image: "https://oddsrun.com/images/image-1715368521170.jpeg",
    datePublished: "2024-05-10",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/understanding-bookmakers-margin/663e728bf634d43053ace4cb",
  },
  {
    id: "6637b8761444eba6ef511a11",
    slug: "which-sport-offers-the-best-betting-value",
    headline: "Which Sport Offers the Best Betting Value?",
    description:
      "Discover which sports offer the best betting value. Learn how unpredictability, statistics, and betting options affect profitability for football, basketball, and more.",
    image: "https://oddsrun.com/images/image-1714927660448.webp",
    datePublished: "2024-05-05",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/which-sport-offers-the-best-betting-value/6637b8761444eba6ef511a11",
  },
  {
    id: "6633f90c188933c29c47d162",
    slug: "the-essence-of-value-bets",
    headline: "Master Value Betting: Unlock Profits with Sports Wagering",
    description:
      "Learn the art of value betting in sports. Discover how to find hidden opportunities, assess odds, and make informed bets to boost your chances of success.",
    image: "https://oddsrun.com/images/image-1726382633949.jpg",
    datePublished: "2024-05-02",
    mainEntityOfPage:
      "https://www.oddsrun.com/article-details/the-essence-of-value-bets/6633f90c188933c29c47d162",
  },
];

function generateJsonLd(targetUrl) {
  // Find the article object
  const foundArticle = articlesDetailsSchemaMarkups.find(
    (article) => `/article-details/${article.slug}/${article.id}` === targetUrl
  );

  if (foundArticle) {
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": foundArticle.mainEntityOfPage,
      },
      headline: foundArticle.headline,
      description: foundArticle.description,
      image: foundArticle.image,
      author: {
        "@type": "Organization",
        name: "OddsRun",
      },
      publisher: {
        "@type": "Organization",
        name: "",
        logo: {
          "@type": "ImageObject",
          url: "",
        },
      },
      datePublished: foundArticle.datePublished,
    };

    return JSON.stringify(jsonLdData, null, 2);
  } else {
    return "Article not found.";
  }
}

const articlesDetailsHeading = [
  {
    id: "are-paid-tips-worth-it-/6723a82deefe2529cc4b204f",
    value: "Are Paid Tips Worth It ?",
  },
  {
    id: "finding-the-best-odds/67236cf7eefe2529cc4b128e",
    value: "Finding the Best Odds",
  },
  {
    id: "best-tennis-betting-lines/66a402364de18bbf06008f3d",
    value: "Best Tennis Betting Lines",
  },
  {
    id: "comparing-betting-odds/6654313afe967ccdad404fe2",
    value: "Comparing Betting Odds",
  },
  {
    id: "how-to-beat-the-bookmaker/664d0e315a95874e8bdf477b",
    value: "How to Beat the Bookmaker",
  },
  {
    id: "understanding-handicaps-in-sports-betting/664a22eab71db23ecff9d974",
    value: "Understanding Handicaps in Sports Betting",
  },
  {
    id: "understanding-bookmakers-margin/663e728bf634d43053ace4cb",
    value: "Understanding Bookmakers Margin",
  },
  {
    id: "which-sport-offers-the-best-betting-value/6637b8761444eba6ef511a11",
    value: "Which Sport Offers the Best Betting Value?",
  },
  {
    id: "the-essence-of-value-bets/6633f90c188933c29c47d162",
    value: "The Essence of Value Bets",
  },
];

const ArticleDetails = () => {
  const [articleDetails, setArticleDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [articlesDetailsPageHeading, setArticlesDetailsPageHeading] =
    useState("");

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

  useEffect(() => {
    const URL = `/article-details/${params.title}/${params.id}`;
    const jsonLdData = JSON.parse(generateJsonLd(URL));

    // find page heading
    const pageHeading = articlesDetailsHeading.find(
      (article) => article.id === `${params.title}/${params.id}`
    );

    if (pageHeading) {
      setArticlesDetailsPageHeading(pageHeading.value);
    }

    if (jsonLdData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      // Convert JSON-LD to a single-line string
      script.text = JSON.stringify(jsonLdData);

      document.head.appendChild(script);

      // Cleanup function to remove the script when component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [params]);

  return (
    <Default>
      <h1 className="fs-3 fw-bold pt-3 px-2 pb-0 mb-0 text-capitalize">
        {articlesDetailsPageHeading !== "" ? articlesDetailsPageHeading : null}
      </h1>
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
                      loading="lazy"
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
