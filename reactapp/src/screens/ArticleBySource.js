import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheets/App.css';
import { Card, Modal} from 'antd';
import { ReadOutlined, LikeOutlined } from '@ant-design/icons';

import Nav from '../components/Nav'
import {connect} from 'react-redux'

const { Meta } = Card;

function ArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  let { id } = useParams();

  let addArticle = async(article) => {
    props.addToWishList(article)
    const data = await fetch('/wishlist', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `title=${article.title}&desc=${article.description}&img=${article.urlToImage}&token=${props.token}&language=${props.language}`
    })

    const body = await data.json()
  }

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=42e3817c9ada4f3ca79753678ba075e4`)
      const body = await data.json()
      setArticleList(body.articles) 
    }

    findArticles()    
  },[])

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    setVisible(false)
  }

  var handleCancel = e => {
    setVisible(false)
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {articleList.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <ReadOutlined key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                      <LikeOutlined key="ellipsis" onClick={()=> addArticle(article)} />
                  ]}
                  >
                    
                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>

              </div>

              ))}
           </div> 
      </div>
  );
}

function mapStateToProps(state){
  return  {token: state.token, language: state.language}
}

function mapDispatchToProps(dispatch){
  return {
    addToWishList: function(article){
      dispatch({type: 'addArticle',
        articleLiked: article
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesBySource)
