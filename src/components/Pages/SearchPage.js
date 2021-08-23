import React, { useEffect, useState } from "react";
import Wrapper from "../helper/Wrapper";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import SearchingPost from "../SearchingPost/SearchingPost";
import Layout from "../../layout/Layout/Layout";
import styles from "../scss/SearchPage.module.scss";
import Loading from "../../UI/Loading/Loading";
import {API_SEARCH_BLOG} from '../api/api'
const SearchPage = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const getParams = params.get("search");
  useEffect(() => {
    setLoading(true);
    const getPostInvolveParams = async () => {
      try {
        const response = await fetch(API_SEARCH_BLOG(getParams));
        if (!response.ok) {
          throw new Error("error!");
        }
        const data = await response.json();
        setPosts(data);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    getPostInvolveParams();
    setLoading(false);
  }, [getParams]);
  return (
    <>
      <Helmet>
        <title>Tìm kiếm thông tin cho từ khóa {getParams} - G-STORE</title>
      </Helmet>
      <Wrapper title="Tìm Kiếm Thông Tin" content={`Tìm thông tin cho từ khóa ${getParams}`}>
        <Layout className={styles.container}>
          {loading && <Loading className={styles.loading} />}
          {!loading && !error && posts && <SearchingPost params={getParams} data={posts} />}
          {!loading && error && <p>Có lỗi xảy ra, xin thừ lại sau</p>}
        </Layout>
      </Wrapper>
    </>
  );
};

export default SearchPage;
