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
    this.news = [];
    const getstuff = async () => {
      const getGames = () => {
        return fetch(
          `https://ancient-dusk-43980.herokuapp.com${this.props.steamID}`
        ) //fetch the games they have played with more than 50 hours
          .then(response => response.json())
          .then(data => {
            let gamepool = []; //create an array
            data = data.response;
            if (data.hasOwnProperty("games")) {
              let list = data.games; //create a list of the games
              list.forEach(game => {
                if (game.playtime_forever > 2500) {
                  gamepool.push(game.appid); //only push to gamepool array if there's more than 50 hours
                }
              });
            }
            return gamepool; //let getGames return our gamepool list
          });
      };
      const getRecent = () => {
        return fetch(
          `https://ancient-dusk-43980.herokuapp.com${this.props.steamID}/recent`
        ) //fetch the games they have played within the past 2 weeks
          .then(response => response.json())
          .then(data => {
            let gamepool = []; //create another gamepool list
            data = data.response;
            if (data.hasOwnProperty("games")) {
              let list = data.games;

              list.forEach(game => {
                gamepool.push(game.appid); //adding these games to our gamepool
              });
            }
            return gamepool; //return the list of all recent games
          });
      };
      let list = []; //create a new array that will have our total games

      const fullList = await Promise.all([getGames(), getRecent()]) //get both the list of games with over 50 hours and recently played games
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
        });

      return fullList; //getStuff will return this list of games to search
    };

    let list = [];

    getstuff().then(results => { // get the list of games
      const getNews = results.map(gameID => //make a promise that i will return an array full of articles
        fetch(`https://ancient-dusk-43980.herokuapp.com/${gameID}/news`)
          .then(res => res.json())
          .then(data => {
            data.appnews.newsitems.forEach(article => { //each article, I want to push it to the list
              list.push(article);
            });
            return data;
          })
      );
      Promise.all(getNews).then(values => { // once our array of promises is fulfilled
        list.sort((a, b) => { //get the list and sort them by date
          return b.date - a.date;
        });
        list.forEach(article => { //get the articles and convert it unix to date format
          article.date = new Date(article.date * 1000)
            .toString() //turn it into a string
            .substring(0, 15); //truncate off the time and seconds, only return day and date
        });
        this.setState({ //set the state.articles to the list, a change in state should trigger a rerender
          articles: list
        });
      });
    });
  }
  render() {
    return (
      <div className={classes.main}>
        {this.state.articles.map((item, index) => { //loop through each article, this doesn't return null because we initialized this.state.articles as
          return (
            <div key={index} className={classes.articles}>
              <div className={classes.title}>{item.title}</div>
              <div className={classes.autor}>Author: {item.author}</div>
              <div className={classes.feed}>Feed: {item.feedlabel}</div>
              <div className={classes.date}>Date: {item.date}</div>
              <a
                style={{ textDecoration: "none" }}
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
