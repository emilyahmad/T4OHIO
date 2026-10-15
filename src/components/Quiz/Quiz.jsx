import React from "react";
import { quizData } from "./quizData";
import "./styles.css";

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    questions: "",
    answer: "",
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  loadQuizData = () => {
    this.setState({
      questions: quizData[this.state.currentQuestion].question,
      answer: quizData[this.state.currentQuestion].answer,
      options: quizData[this.state.currentQuestion].options
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }

  nextQuestionHandler = () => {
    const { myAnswer, answer, score, currentQuestion } = this.state;

    this.setState({
      score: myAnswer === answer ? score + 1 : score,
      currentQuestion: currentQuestion + 1,
      myAnswer: null,
      disabled: true
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState({
        questions: quizData[this.state.currentQuestion].question,
        options: quizData[this.state.currentQuestion].options,
        answer: quizData[this.state.currentQuestion].answer
      });
    }
  }

  checkAnswer = (answer) => {
    this.setState({
      myAnswer: answer,
      disabled: false
    });
  };

  finishHandler = () => {
    const { currentQuestion, myAnswer, answer, score } = this.state;

    if (currentQuestion === quizData.length - 1) {
      this.setState({
        score: myAnswer === answer ? score + 1 : score,
        isEnd: true
      });
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd, questions, score } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3>If you were boba, you would be: {score}!</h3>
          {/* show a picture of flavor */}
          {/* button to order it */}
          {/* button to retake test/navigate to a diff page */}
        </div>
      );
    }

    return (
      <div className="Quiz-container">
        <h1>{questions}</h1>

        <span>{`Question ${currentQuestion + 1} of ${quizData.length}`}</span>
        
        <div className="options-container">
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`ui floating message options ${
                    myAnswer === option.text ? "selected" : ""
                    }`}
                    onClick={() => this.checkAnswer(option.text)}
                >
                    <img
                    src={option.image}
                    alt={option.text}
                    className="option-image"
                    />
                    <p>{option.text}</p>
                </div>
                ))}
        </div>

        {currentQuestion < quizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next
          </button>
        )}

        {currentQuestion === quizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.finishHandler}
          >
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default MainQuiz;