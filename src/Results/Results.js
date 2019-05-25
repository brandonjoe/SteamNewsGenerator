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
      search: "",
      name: ""
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
        `https://ancient-dusk-43980.herokuapp.com/${
          this.props.steamID
        }/gamelist` //returns a list of every single steam appid and gamename
      )
        .then(res => res.json())
        .then(data => {
          data.applist.apps.forEach(item => { //if the appid matches the appid from our fetched data, pass the name over to the list
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
        Promise.all(getNews).then(values => {
          // once our array of promises is fulfille
          list.sort((a, b) => {
            //get the list and sort them by date
            return b.date - a.date;
          });
          gamelist.map(game => {
            list.map(article => { //this operation takes a while, but basically sets the gamename to an updated game name from steam
              if (article.appid == game.appid) {
                article.feedname = game.name;
              }
            });
          });
          list.forEach(article => { // some articles don't have any authors in the preview, tells the user click the article if they want need to know who the author is
            if (article.author == "") {
              article.author = "In article";
            }
          });
          let list2 = list; // sometimes steam's api returns 2 of the same articles from "rock, paper, shotgun", this removes one of them. 
          list.forEach((article, index) => {
            list2.forEach((article2, index2) => {
              if(article.title == article2.title) {
                list.splice(index,1)
              }
            })
          })
          let newList = [];
          list.forEach(article => { //this first turns turns everything to unix, and returns everything before a certain date
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
  updateSearch(event) { //passes search filter to state
    this.setState({
      search: event.target.value
    });
  }
  render() { //let the showed games only be games within the search filter, if nothing's in it, then show everything
    let filtergames = this.state.articles.filter(game => {
      return (
        game.feedname.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (
      <div>
        <input
          type="text"
          className={classes.input}
          placeholder="Filter games"
          value={this.state.search}
          onChange={evt => this.updateSearch(evt)}
        />
        <div className={classes.main}>

          {(this.state.articles.length === 0 && this.state.isDone === false) ? // show the loading spinner
          ( <div className={classes.loadcontainer}><div className={classes.ldsdefault}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div className={classes.loading}>Loading your articles...</div></div>
            ) : (this.state.articles.length === 0 && this.state.isDone === true) ? ( // if nothing comes back, the length is 0, and that means their profile is private. 
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
              to make sure your profile settings are public or try a different steam ID.
            </div>
          ) : (
            filtergames.map((item, index) => {
              //loop through each filtered, this doesn't return null because we initialized this.state.articles as an empty array
              return (
                <div
                  key={index}
                  onClick={() => window.open(`${item.url}`, "_blank")}
                  className={classes.articles}
                >
                  <div className={classes.title}>{item.title}</div>
                  <div classes={classes.main2}>
                    <div className={classes.left}>
                      <div className={classes.appid}>Game: {item.feedname}</div>
                      <div className={classes.autor}>Author: {item.author}</div>
                      <div className={classes.feed}>Feed: {item.feedlabel}</div>
                      <div className={classes.date}>Date: {item.date}</div>
                      <div className={classes.link}>Click for full article</div>
                    </div>
                   
                      <img
                      
                      src={`https://steamcdn-a.akamaihd.net/steam/apps/${
                        item.appid
                      }/header.jpg`}
                      alt={`Image of ${item.feedname} couldn't load`} //if the image can't load, the user is notified. 
                    />
                  </div>
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
