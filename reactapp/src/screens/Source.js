import React,{useState, useEffect} from 'react';
import {Link, withRouter } from 'react-router-dom'
import '../stylesheets/App.css';
import { List, Avatar} from 'antd';
import {Grid, Typography, Box, Container} from '@mui/material'
import Nav from '../components/Nav'
import { connect } from 'react-redux';

function Source(props) {

  const [sourceList, setSourceList] = useState([]);
  const [selectedLang, setSelectedLang] = useState(props.language);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userName = async() => {
        const data = await fetch(`/users/username?token=${props.token}`);
        const body = await data.json();
        setUsername(body.username);
    }
    userName()
  }, [props.token])

  useEffect(() => {
    const userLanguage = async() => {
        const data = await fetch(`/users/language?token=${props.token}`);
        const body = await data.json();
        setSelectedLang(body.language);
    }
    userLanguage()
  }, [props.token])

  let languageHandle = async(language) => {
    await fetch('/users/language', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `language=${language}&token=${props.token}`
    })
    // console.log(selectedLang)
    setSelectedLang(language);
    props.setLanguage(language);
  }

  useEffect(() => {
    const APIResultsLoading = async() => {
      const data = await fetch(`https://newsapi.org/v2/sources?language=${selectedLang}&apiKey=42e3817c9ada4f3ca79753678ba075e4`)
      const body = await data.json()
      let sources = body.sources;
      sources.forEach(source => {
        source.logo = `//logo.clearbit.com/${source.url}`;
      });
      setSourceList(sources);
    }
    APIResultsLoading()
  }, [selectedLang])
    
  if (username != null) {
      return(
      <div>
        <Nav/>
        <Box className="Banner">
          <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center'}} className='Banner-opacity'>
            <Grid item sx={{width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} >
              <Typography variant='h5'>
                Choose country you want to read articles from :
              </Typography>
            </Grid>
            <Grid item>
              <img style={{width:'40px', margin:'10px',cursor:'pointer'}} alt='french flag' src='/images/fr.png' onClick={() => languageHandle('fr')} />
              <img style={{width:'40px', margin:'10px',cursor:'pointer'}} alt='uk flag' src='/images/en.png' onClick={() => languageHandle('en')} /> 
              <img style={{width:'40px', margin:'10px',cursor:'pointer'}} alt='german flag' src='/images/de.png' onClick={() => languageHandle('de')} /> 
            </Grid>
          </Grid>
        </Box>
       
        <Container maxWidth='md' className="HomeThemes">
            
                <List
                    itemLayout="horizontal"
                    dataSource={sourceList}
                    renderItem={source => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={source.logo} />}
                          title={<Link to={`/articlesbysource/${source.id}`}>{source.name}</Link>}
                          description={source.description}
                        />
                      </List.Item>
                    )}
                  />


            </Container>
          </div>)
  } else {
    return(<Typography> User does not exist</Typography>)
  } 
      
                 
     
}

function mapStateToProps(state){
  return {language: state.language, token: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    setLanguage: function(language){
      dispatch({type: 'changeLanguage', language: language})
    }
  }
}

export default withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(Source));
