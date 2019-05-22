import React, { Component } from "react";

import classes from "./Results.module.css";
class Results extends Component {
  //for testing steamIDs
  //not played in 2 weeks 76561198018232960
  //has played 2 games in 2 weeks 76561198093118389
  // 76561198046981667
  // 76561198018404923
  // 76561197968576433

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isDone: false,
      search: ''
    };
  }

  componentDidMount() {
    const getstuff = async () => {
      const getGames = () => {
        return fetch(
          `https://ancient-dusk-43980.herokuapp.com/${this.props.steamID}`
        ) //fetch the games they have played with more than 50 hours
          .then(response => response.json())
          .then(data => {
            let gamepool = []; //create an array
            data = data.response;
            if (data.hasOwnProperty("games")) {
              let list = data.games; //create a list of the games
              list.forEach(game => {
                if (game.playtime_forever > this.props.value * 60) {
                  gamepool.push(game.appid); //only push to gamepool array if there's more than x hours
                }
              });
            }
            return gamepool; //let getGames return our gamepool list
          });
      };
      const getRecent = () => {
        return fetch(
          `https://ancient-dusk-43980.herokuapp.com/${
            this.props.steamID
          }/recent`
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
    let gamelist = [];
    getstuff().then(results => {
      // get the list of games
      const getNames = fetch(
        `https://ancient-dusk-43980.herokuapp.com/${this.props.steamID}/gamelist`
      )
        .then(res => res.json())
        .then(data => {
          data.applist.apps.forEach(item => {
            let game = {
              appid: item.appid,
              name: item.name
            };
            gamelist.push(game);
          });
          return gamelist;
        });
      const getNews = results.map((
        gameID //make a promise that i will return an array full of articles
      ) =>
        fetch(`https://ancient-dusk-43980.herokuapp.com/${gameID}/news`)
          .then(res => res.json())
          .then(data => {
            data.appnews.newsitems.forEach(article => {
              //each article, I want to push it to the list
              list.push(article);
            });
            return data;
          })
      );

      getNames.then(val => {
        console.log(gamelist);
        console.log(list);
        
        Promise.all(getNews).then(values => {
          // once our array of promises is fulfille
          list.sort((a, b) => {
            //get the list and sort them by date
            return b.date - a.date;
          });
          gamelist.map(game => {
            list.map(article => {
              if (article.appid == game.appid) {
                article.appid = game.name;
              }
            });
          });
          list.forEach(article => {
            if(article.author == ""){
              article.author = article.appid
            }

          })
          let newList = [];
          list.forEach(article => {
            let ts = Math.round(new Date().getTime() / 1000);
            ts = ts - this.props.months * 2582000;
            if (article.date > ts) {
              newList.push(article);
            }
          });
          newList.forEach(article => {
            //get the articles and convert it unix to date format
            article.date = new Date(article.date * 1000)
              .toString() //turn it into a string
              .substring(0, 15); //truncate off the time and seconds, only return day and date
          });
          this.setState({
            //set the state.articles to the list, a change in state should trigger a rerender
            articles: newList,
            isDone: true
          });
        });
      });
    });
  }
updateSearch(event) {
  this.setState({
    search: event.target.value
  })
}
  render() {

    let filtergames = this.state.articles.filter(
     (game) => {
       return game.appid.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
     }
    )
    return (<div>
    <input type="text" className={classes.input} placeholder="Filter games" value={this.state.search} onChange={evt => this.updateSearch(evt)}></input>
      <div className={classes.main}>
      
        {this.state.articles.length === 0 && this.state.isDone === true ? ( //This is used to make sure that we got data back, if we didn't it means their profile is private and they need to fix that.
          <div className={classes.private}>
            Unable to retrieve data from server. Check{" "}
            <span>
              <a
                className={classes.settings}
                style={{ textDecoration: "none", color: "grey" }}
                href="https://steamcommunity.com/my/edit/settings"
              >
                here
              </a>
            </span>{" "}
            to make sure your profile is public or try a different steam ID
          </div>
        ) : (
          filtergames.map((item, index) => {
            //loop through each article, this doesn't return null because we initialized this.state.articles as
            return (
              <div
                key={index}
                onClick={() => window.open(`${item.url}`, "_blank")}
                className={classes.articles}
              >
                <div className={classes.title}>{item.title}</div>
                <div className={classes.appid}>Game: {item.appid}</div>
                <div className={classes.autor}>Author: {item.author}</div>
                <div className={classes.feed}>Feed: {item.feedlabel}</div>
                <div className={classes.date}>Date: {item.date}</div>
                <a
                  style={{ textDecoration: "none" }}
                  href={`${item.url}`}
                  target="_blank"
                  className={classes.link}
                >
                  Click for full article
                </a>
              </div>
            );
          })
        )}
      </div>
      </div>
    );
  }
}

export default Results;
