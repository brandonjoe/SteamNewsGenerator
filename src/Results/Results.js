import React, { Component } from "react";
class Results extends Component {
  //not played in 2 weeks 76561198018232960 3dayrespawn
  //has played 2 games in 2 weeks kast master
  //plays lots of games 76561198046981667
  //magic 76561198018404923
  //jorm 76561197968576433 
  constructor(props) {
    super(props)
    this.state = {
        
    };
}
  componentWillMount() {
    let steamID = this.props.location.pathname;
    console.log(steamID);
    let gamepool = [];
    const self = this;
    this.news = [];
    fetch(`http://localhost:5000${steamID}`) //fetch the games they have played with more than 50 hours
      //fetch("https://ancient-dusk-43980.herokuapp.com/76561198046981667")
      .then(response => response.json())
      .then(data => {
        data = data.response;
        if (data.hasOwnProperty("games")) {
          let list = data.games;
          console.log(list);
          list.forEach(game => {
            if (game.playtime_forever > 2250) {
               gamepool.push(game.appid);
            }
          });
        }
        fetch(`http://localhost:5000${steamID}/recent`) //fetch the games they have played within the past 2 weeks
          //fetch("https://ancient-dusk-43980.herokuapp.com/76561198046981667/recent")
          .then(response => response.json())
          .then(data => {
            data = data.response;
            if (data.hasOwnProperty("games")) {
              let list = data.games;

              list.forEach(game => {
                 gamepool.push(game.appid); //adding these games to our gamepool
              });
            }
            gamepool = gamepool.filter((item, index, inputArray) => {
              return inputArray.indexOf(item) === index;   //removing the duplicates
            });
            console.log(gamepool);
            return gamepool;
          })
          .then(gamepool => {
            gamepool.forEach(gameID => {
              fetch(`http://localhost:5000/${gameID}/news`)
                .then(response => response.json())
                .then(data => {
                  data = data.appnews.newsitems;
                  data.forEach(neww => {
                    this.news.push(neww);
                    self.setState({total: this.news})
                  });

                })
               
            });
         
          })
      })

  }
 
  render() {
 
    if(this.state && this.state.total){
        var items = this.state.total.map(item => {
            return <h1>{item.title}</h1>
        })
    }
    
    
     
    return <div>
        <h1>asdfdsf</h1>

     
       <div>{items}</div>
    
    </div>
  }
}

export default Results;
