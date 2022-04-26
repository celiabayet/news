import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import '../stylesheets/App.css';
import { Card, Modal} from 'antd';
import { ReadOutlined, DeleteOutlined } from '@ant-design/icons';
import Nav from '../components/Nav'
import {connect} from 'react-redux'

const { Meta } = Card;

function Library(props) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wishlist, setWishlist] = useState([]);

 useEffect(() => {
    const wishlistLoading = async() => {
        await fetch(`/users/wishlist?token=${props.token}`)
          .then(response => response.json())
          .then(json => { 
            console.log(`json.wishlist: ${json.wishlist}`);
            setWishlist(json.wishlist) });   
    }
    wishlistLoading()
  }, [props.token])

    console.log(`wishlist : ${wishlist}`)
    console.log(typeof wishlist)
    if (!Array.isArray(wishlist)){
      console.log('this is not array')
    } else {console.log('this is not array')}

    // wishlist.map(article => {console.log(article)})

  for (let i=0; i<wishlist.length; i++){
    console.log(wishlist[i].title)
  }

  
  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var noArticles
  if(wishlist.length === 0){
    noArticles = <div style={{marginTop:"30px"}}>No Articles</div>
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            {noArticles}

            <div className="Card">
    
      
            {wishlist.map((article,i) => (
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
                        src={article.img}
                    />
                    }
                    actions={[
                        <ReadOutlined key="ellipsis2" onClick={() => showModal(article.title,article.description)} />,
                        <DeleteOutlined key="ellipsis" onClick={() => props.deleteToWishList(article.title)} />
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
  return {token: state.token}
}

// function mapDispatchToProps(dispatch){
//   return {
//     deleteToWishList: function(articleTitle){
//       dispatch({type: 'deleteArticle',
//         title: articleTitle
//       })
//     }
//   }
// }



// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Library);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Library)
);
