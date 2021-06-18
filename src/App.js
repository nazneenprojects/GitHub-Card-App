import React from 'react';
import './App.css';
import axios from 'axios';

//Sample Data : "api.github.com/users/gaearon"
// const testData = [
//   {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
//   {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
//   {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ];

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} alt="profile img" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
	render() {
  	return (
    	<div>
    	  <div className="header">GitHub Cards App</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

export default App;

// //Sample Data : "api.github.com/users/gaearon"
// // const testData = [
// //   {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
// //   {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
// //   {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// // ];

// //1
// const CardList = (props) => {
//   return (
//   <div>
//     {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
//     {/* <Card {...testData[0]} />
//     <Card {...testData[1]}/>  */}
//   </div>);
// }

// //2
// class Card extends React.Component
// { 
//   // constructor(props)
//   // {
//   //   super(props);
//   //   this.state = {
//   //     profiles: testData,
//   //   };
//   // }

//   // state = {
//   //   profiles: testData,
//   // };
   
//   render(){

//   const profile = this.props;
//   return(
//   <div className="github-profile">
//        <img src={profile.avatar_url} alt="profile"/>
//         <div className="info">
//           <div className="name">{profile.name}</div>
//           <div className="company">{profile.company}</div>
//         </div>
//   </div>
//   );
// }}
// //3
// class Form extends React.Component{
//     state = { userName: '' };
//     handleSubmit = async (event) => {
//     event.prevenDefault();
//     //console.log(this.state.userName);
//     const resp = await 
//     axios.get(`https://api.github.com/users/${this.state.userName}`);
//     this.props.onSubmit(resp.data);
//     this.setState({ userName: '' });
//   };

//   render(){
//     return(
//     <form onSubmit={this.handleSubmit}>
//      <input 
//       type="text"
//       value={this.state.userName}
//       onChange={event => this.setState({ userName: event.target.value })}
//       placeholder="Github username" required/>
//       <button>Add Card</button>
//     </form>
//  );
//   }
// }

// //4
// class App extends Component
// {
//   state = {
//     profiles: [],
//   };
//   addNewProfile = (profileData) => {
//   	this.setState(prevState => ({
//     	profiles: [...prevState.profiles, profileData],
//     }));
//   };
//   render() {
//     return (
//       <div className="App"> GitHub Cards App
//       <Form onSubmit={this.addNewProfile} />
//       <CardList profiles={this.state.profiles} />
//       </div> 
//     );
//   }

// }
// export default App;

