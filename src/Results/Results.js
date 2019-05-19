import React, { Component } from "react";
class Results extends Component {
  //not played in 2 weeks 76561198018232960 3dayrespawn
  //has played 2 games in 2 weeks kast master 76561198093118389
  //plays lots of games 76561198046981667
  //magic 76561198018404923
  //jorm 76561197968576433
  constructor(props) {
    super(props);
    this.state = {
      gamepool: []
    };
  }
  componentWillMount() {
    let steamID = this.props.location.pathname;
    console.log(steamID);

    this.news = [];
    const getGames = () => {
      return (
        fetch(`http://localhost:5000${steamID}`) //fetch the games they have played with more than 50 hours
          //fetch("https://ancient-dusk-43980.herokuapp.com/76561198046981667")
          .then(response => response.json())
          .then(data => {
            let gamepool = [];
            data = data.response;
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
        fetch(`http://localhost:5000${steamID}/recent`) //fetch the games they have played within the past 2 weeks
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

    Promise.all([getGames(), getRecent()]).then(values => {
      let list = [];
      for (let i = 0; i < 2; i++) {
        values[i].forEach(game => {
          list.push(game);
        });
      }
      list = list.filter((item, index, inputArray) => {
        return inputArray.indexOf(item) === index;
      });
      this.setState({
        gamepool: list
      });
      const getNews = () => {
        let articles = [];
        list.forEach(gameID => {
          fetch(`http://localhost:5000/${gameID}/news`)
            .then(response => response.json())
            .then(data => {
              data = data.appnews.newsitems;
              data.forEach(article => {
                articles.push(article);
              });
            });
        });
        return articles;
      };
      Promise.all([getNews()]).then(value => {
        this.setState({
          articles: value
        })
        console.log(this.state)
      });
    });
    //IT WORKS
    
  }
  render() {
    let date;
    if (this.state && this.state.total) {
      console.log(this.state);
      var items = this.state.total.map(item => {
        console.log("help");
        return [<h1>{item.title}</h1>, <h2>{item.url}</h2>, <h3>{date}</h3>];
      });
    }

    return (
      <div>
        <h1>asdfdsf</h1>

        <div>{items}</div>
      </div>
    );
  }
}

export default Results;
