import React, { Component } from "react";

import classes from "./Results.module.css";
class Results extends Component {
  //not played in 2 weeks 76561198018232960 3dayrespawn
  //has played 2 games in 2 weeks kast master 76561198093118389
  //plays lots of games 76561198046981667
  //magic 76561198018404923
  //jorm 76561197968576433

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isDone: false
    };
  }

  componentDidMount() {
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    this.news = [];
    const getstuff = async () => {
      const getGames = () => {
        return (
          fetch(`https://ancient-dusk-43980.herokuapp.com${this.props.steamID}`) //fetch the games they have played with more than 50 hours
            //fetch("https://ancient-dusk-43980.herokuapp.com/76561198046981667")
            .then(response => response.json())
            .then(data => {
              console.log("aaaa");
              let gamepool = [];
              data = data.response;
              console.log(data);
              if (data.hasOwnProperty("games")) {
                let list = data.games;
                console.log(list);
                list.forEach(game => {
                  if (game.playtime_forever > 5000) {
                    gamepool.push(game.appid);
                  }
                });
              }
              return gamepool;
            })
        );
      };
      const getRecent = () => {
        return (
          fetch(
            `https://ancient-dusk-43980.herokuapp.com${
              this.props.steamID
            }/recent`
          ) //fetch the games they have played within the past 2 weeks
            //fetch("https://ancient-dusk-43980.herokuapp.com/76561198046981667/recent")
            .then(response => response.json())
            .then(data => {
              let gamepool = [];
              data = data.response;
              if (data.hasOwnProperty("games")) {
                let list = data.games;

                list.forEach(game => {
                  gamepool.push(game.appid); //adding these games to our gamepool
                });
              }
              return gamepool;
            })
        );
      };
      let list = [];

      const people = await Promise.all([getGames(), getRecent()])
        .then(values => {
          for (let i = 0; i < 2; i++) {
            //merge both arrays together.
            values[i].forEach(game => {
              list.push(game);
            });
          }
          list = list.filter((item, index, inputArray) => {
            //get rid of any duplicates
            return inputArray.indexOf(item) === index;
          });
          return list;
        })
        .then(val => {
          return list;
        });

      return people;
    };
    const getNews = async () => {
      await getstuff().then(result => {
        asyncForEach(result, async gameID => {
         await  fetch(`https://ancient-dusk-43980.herokuapp.com/${gameID}/news`)
            .then(res => res.json())
            .then(data => {
              data.appnews.newsitems.forEach(article => {
                this.setState({
                  articles: [...this.state.articles, article]
                });
                this.state.articles = this.state.articles.sort(function(a, b) {
                  return b.date - a.date;
                });
              });
            })
        });
      })
      return this.state;
    };
    Promise.all([getNews()])
    .then(val => {
      console.log(val)
    })
    async function init () {
      await getNews()
      console.log('help')
    }
    init()
      

    setTimeout(() => {
      this.state.articles.forEach(article => {
        article.date = new Date(article.date * 1000)
          .toString()
          .substring(0, 15);
      });
      this.setState({
        hello: []
      });
      console.log(this.state);
    }, 3000);
    if(this.state.isDone){
      console.log('ASDFDSAFSDAFSDAF')
    }
  }
  componentDidUpdate() {
    if(this.state.isDone === true){
      console.log('plswork')
    }
  }
  render() {
    return (
        <div className={classes.main}>
          {this.state.articles.map(item => {
            return (
              <div className={classes.articles}>
                <div className={classes.title}>{item.title}</div>
                <div className={classes.autor}>Author: {item.author}</div>
                <div className={classes.feed}>Feed: {item.feedlabel}</div>
                <div className={classes.date}>Date: {item.date}</div>
                <a
                  style={{ "text-decoration": "none" }}
                  href={`${item.url}`}
                  target="_blank"
                  className={classes.link}
                >
                  Link to full article
                </a>
              </div>
            );
          })}
        </div>

    );
  }
}

export default Results;
