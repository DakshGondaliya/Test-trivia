import React, {
  Component
} from 'react';

// the unicode entities into normal text conversion
import {
  XmlEntities as Entities
} from 'html-entities';

import _ from 'lodash'; // it is used to shuffle between correcr and incorrect answer

class App extends Component {

  state = {
    loading: true,
    questions: [],
    selected: [false, false, false, false, false, false, false, false, false, false],
    submitted: false,
    correct: null
  };

  //fetch json data using api calling
  async componentDidMount() {
    const url = "https://opentdb.com/api.php?amount=10";
    const response = await fetch(url);
    const data = await response.json();
    const questions = data.results.map(question => {
      const currentQuestion = {
        ...question
      };
      const answers = [question.correct_answer, ...question.incorrect_answers];
      currentQuestion.options = _.shuffle(answers);
      return currentQuestion;
    });

    this.setState({
      questions
    });
  }

  //function for selecting the answer
  setAnswer = (e) => {
    const index = e.target.name;
    const selected = [...this.state.selected];
    if (this.state.questions[index].correct_answer === e.target.value) {
      selected[index] = true;
    } else {
      selected[index] = false;
    }

    this.setState({
      selected
    });
  }

  //submit form
  submit = (e) => {
    e.preventDefault();
    const {
      selected
    } = this.state;

    let correct = selected.filter(value => value).length;
    this.setState({
      submitted: true,
      correct: correct
    })

  }

  //on click restart test
  handleClick = (e) => {
    window.location.reload();
  }

  render() {
    const entities = new Entities();
    const {
      questions
    } = this.state
    const questionList = questions.map((question, index) => {

      return ( <
        div className = "ts-card uk-box-shadow-small"
        key = {
          index
        } >
        <
        div className = "question" > {
          index + 1
        }. {
          entities.decode(question.question)
        } < /div >

        {
          question.options.length === 2 ? ( <
            div onChange = {
              this.setAnswer
            }
            className = "uk-margin uk-grid-small uk-child-width-auto uk-grid" >
            <
            label >
            <
            input className = "uk-radio"
            type = "radio"
            value = {
              question.options[0]
            }
            name = {
              index
            }
            />{entities.decode(question.options[0])} < /
            label >
            <
            label >
            <
            input className = "uk-radio"
            type = "radio"
            value = {
              question.options[1]
            }
            name = {
              index
            }
            />{entities.decode(question.options[1])}  < /
            label > <
            /div>  
          ) : ( <
            div onChange = {
              this.setAnswer
            }
            className = "uk-margin uk-grid-small uk-child-width-auto uk-grid" >
            <
            label >
            <
            input className = "uk-radio"
            type = "radio"
            value = {
              question.options[0]
            }
            name = {
              index
            }
            />{entities.decode(question.options[0])} </
            label >
            <
            label >
            <
            input className = "uk-radio"
            type = "radio"
            value = {
              question.options[1]
            }
            name = {
              index
            }
            />{entities.decode(question.options[1])} < /
            label >
            <
            label >
            <
            input className = "uk-radio"
            type = "radio"
            value = {
              question.options[2]
            }
            name = {
              index
            }
            />{entities.decode(question.options[2])} < /
            label >
            <
            label >
            <
            input className = "input uk-radio"
            type = "radio"
            value = {
              question.options[3]
            }
            name = {
              index
            }
            />{entities.decode(question.options[3])} < /
            label > <
            /div> 
          )
        } <
        /div>
      )
    });

    return ( <
      div > {
        this.state.Loading || !this.state.questions ? ( <
          div > Loading..... < /div> 
        ) : ( <
          div > {
            !this.state.submitted ? ( <
              div >
              <
              form className = "form "
              onSubmit = {
                this.submit
              } > {
                questionList
              } < button className = "uk-button submit-buttonuk-button-primary" >
              Submit <
              /button> < /
              form > <
              /div>
            ) : ( <
              div >
              <
              div className = "ts-card uk-box-shadow-small container submit" >
              <
              h2 className = "result" > Result < /h2> <
              p className = "res-text" > You answered < b > < span className = "green" > {
                this.state.correct
              } < /span></b > out < b > 10 < /b> questions correct</p >

              <
              button className = "uk-button button-2"
              type = "submit"
              onClick = {
                this.handleClick
              } > Restart Test < /button> < /
              div > <
              /div>
            )
          } <
          /div>
        )
      } <
      /div>
    )
  }
}


export default App;