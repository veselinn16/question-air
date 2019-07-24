import React, { Component } from "react";
import { Link } from "react-router-dom";
import animation from "../utils/sortableItem";
import Questions from "../components/Questions";
import Icon from "../components/Icon";
import Social from "../components/Social";
import Error from "../routes/Error";

class Arrange extends Component {
  constructor(props) {
    super(props);
    this.dom = {
      container: React.createRef(), // container of questions
      listQuestions: [] // Array of question elements
    };
  }

  componentDidMount() {
    if (this.dom.listQuestions.length > 0) {
      animation.container = this.dom.container; // the container of the animation
      animation.setVal(90, this.dom.listQuestions.length, this.props.questions);
      animation.setAnimation(this.dom.container); // sets Tween to animation container
      this.dom.listQuestions.map((el, i) =>
        animation.Sortable(el, i, this.dom.container)
      ); // converts nodes to Sortables
    }
  }

  displayQuestion(question) {
    // truncate the question if it's too big to fit into space
    return question.length > 35
      ? question.replace(question.slice(35, question.length), "...")
      : question;
  }

  render() {
    const { questions } = this.props; // props object destructuring
    return questions.length > 0 ? (
      <div className="arrange-container">
        <section className="left">
          <Icon dims="640" type="logo" classes="logo logo-2" />
          <div
            className="container-arrange"
            ref={container => (this.dom.container = container)}
          >
            {questions.map((question, i) => {
              return (
                <div
                  className="list-item"
                  key={i}
                  ref={question => (this.dom.listQuestions[i] = question)}
                >
                  <div className="item-content">
                    <span className="order">{i + 1}</span>.{" "}
                    {this.displayQuestion(question.question)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="right">
          <Questions questions={questions} />
        </section>
        <Link className="btn btn-questions" to="/question">
          Show Questions
        </Link>
        <Social inst="2" clazz="footer-1" />
      </div>
    ) : (
      <Error
        text="No Questions Found!"
        recommendation="Enter questions, please!"
      />
    );
  }
}

export default Arrange;
