import TweenLite from "gsap";
import Draggable  from "gsap/Draggable";

const sortables = [];
let rowSize = null; // determines the height of a row
let total = null; // length of questions array
let questions = null; // original array of questions

function clamp(value, a, b) {
  // clamps a value to a min/max
  // maybe clamp is not the best name, place is better
  return value < a ? a : (value > b ? b : value); // value is the row, based on the location of the question element, and compares it with 0(first row) and value(the final row)
}

function arrayMove(array, from, to) {
  // changes an elements's position in array
  array.splice(to, 0, array.splice(from, 1)[0]);
}

function changeIndex(item, to, container) {
  // change position in array
  arrayMove(sortables, item.index, to); // modifies the sortables array
  arrayMove(questions, item.index, to); // modifies the original questions array
  

  // change element's position in DOM
  if (to === 2 - 1) {
    container.appendChild(item.element); // if the question's index is equal to the total length of the questions array append the question to the container at the bottom
  } else {
    let i = item.index > to ? to : to + 1; // sets i based on whether the question's index is bigger than the old index or lower
    container.insertBefore(item.element, container.children[i]); // inserts the question before the index of the question which has to be after it
  }    
      
  // set index for each sortable
  sortables.forEach((sortable, index) => sortable.setIndex(index));
}

export default {
  setAnimation(element) {
    TweenLite.to(element, 0.5, { autoAlpha: 1 }); // sets animation Tween to the cointainer
  },
  
  setVal(size, number, questionsArray) {
    rowSize = size;
    total = number;
    questions = questionsArray;
  },

  Sortable(element, index, container) {
    let content = element.querySelector(".item-content");
    let order   = element.querySelector(".order");
    
    let animation = TweenLite.to(content, 0.3, {
      boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
      force3D: true, // keeps element in 3D mode.  PLAY AROUND WITH THIS!!
      scale: 1.1,
      paused: true // animation pauses itself immediately after creation
    });
    
    let dragger = new Draggable(element, {        
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: "inherit",    
      type: "y"
    });
    
    // properties and methods of each sortable
    let sortable = {
      dragger,
      element,
      index,
      setIndex
    };
    
    TweenLite.set(element, { y: index * rowSize }); // sets the position of the item based on its index. F.ex.: for the first question el is 0 * 100 = 0 
        
    function setIndex(index) {
      sortable.index = index; // sets the new index of the question  
      order.textContent = index + 1; // sets the text of the order element based on index of question
      
      (!dragger.isDragging) && layout(); // don't layout if you're dragging
    }
    
    function downAction() {
      // called as soon as mouse moves 2px(dragging has begun)
      animation.play(); // animates box-shadow, scale, translate3d(), paused
      this.update(); // updates the question(Draggable instance)'s y property to reflect its modified position
    }
    
    function dragAction() {
        // called every single time the mouse moves during drag
        // calculate the current index based on element's position
        let index = clamp(Math.round(this.y / rowSize), 0, total - 1); // returns the index where the element should be placed among the order of questions
        
        if (index !== sortable.index) { // if index is modified e.g. element is moved
          changeIndex(sortable, index, container); // change its index
        }
    }
    
    function upAction() {
      // called when the dragging ends
      animation.reverse();
      layout();
    }
    
    function layout() {
      // creates a TweenLite instance, which animates the question element's specified values - y
      TweenLite.to(element, 0.3, { y: sortable.index * rowSize });  
    }
        
    sortables.push(sortable);
  }
}