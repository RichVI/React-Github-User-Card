import React, {Component} from 'react';
import './App.css';
import axios from "axios";

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }

class App extends Component{
state = ({
  myData: {},
  myFollowers: []
});


componentDidMount(){
  axios
  .get('https://api.github.com/users/RichVI')
  .then(res => {
    console.log("My card",res);
    this.setState({
      myData: res.data,
    })
  })
  .catch(err => console.log("axios get error", err))


  axios
  .get('https://api.github.com/users/RichVI/followers')
  .then(res => {
    console.log("My followers Card",res);
    this.setState({
      myFollowers: res.data
    })
  })
  .catch(err => console.log("axios get error", err))



}


render(){
  return(
    <div className="App">
        <header>
          <h1>My Github User Cards</h1>
          <div className="container">
            <div className="card">
            <h4>{this.state.myData.login}</h4>
               <p>Bio: {this.state.myData.bio}</p>
               <p>Followers: {this.state.myData.followers}</p>
              <img 
                className="card_avatar"
                alt={this.state.myData.login}
                src={this.state.myData.avatar_url}
              />
            </div>
          </div>
        </header>

        <h2>My Followers</h2>
          <div className="container">
          {this.state.myFollowers.map( follower => {
               return (
                 <a href={follower.html_url} className="card">
                   <div>
                     <img 
                       className="card_avatar"
                       alt={follower.login}
                       src={follower.avatar_url}
                     />
                     <h4>{follower.login}</h4>
                   </div>
                 </a>
               );
             })}
            </div>
      </div>
  )
}


}
export default App;
