import TweenLite from "gsap";
import Draggable  from "gsap/Draggable";

const sortables = [];

function clamp(value, a, b) {
  // clamps a value to a min/max
  // maybe clamp is not the best name, place is better
  console.log('(9) outside of Sortable() clamp() is running.');    
  return value < a ? a : (value > b ? b : value); // value is the row, based on the location of the question element, and compares it with 0(first row) and value(the final row)
}

function arrayMove(array, from, to) {
  // changes an elements's position in array
  console.log('(8) outside of Sortable arrayMove() is running.');
  array.splice(to, 0, array.splice(from, 1)[0]);
}

function changeIndex(item, to, container) {
  console.log('(1) changeIndex() is running.');
  // Change position in array
  arrayMove(sortables, item.index, to);

  // Change element's position in DOM. Not always necessary. Just showing how.
  if (to === 2 - 1) {
    container.appendChild(item.element); // if the question's index is equal to the total length of the questions array append the question to the container at the bottom
  } else {
    let i = item.index > to ? to : to + 1; // sets i based on whether the question's index is bigger than the old index or lower
    container.insertBefore(item.element, container.children[i]); // inserts the question before the index of the question which has to be after it
  }
  console.log(sortables);
  console.log(typeof sortables);    
      
  // Set index for each sortable
  sortables.forEach((sortable, index) => sortable.setIndex(index));
}

export default {
  // setVal(container, total, sortables, rowSize) {
  //   return {
  //     container,
  //     total,
  //     sortables,
  //     rowSize
  //   }
  // },
  
  // returnVal(val) {

  //   return object.val
  // }
  total: null,
  rowSize: null,

  Sortable(element, index, container) {
    console.log('(2) Sortable() is running.');
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
    
    // Public properties and methods.
    let sortable = {
      dragger,
      element,
      index,
      setIndex
    };
    
    TweenLite.set(element, { y: index * 100 }); // sets the position of the item based on its index. F.ex.: for the first question el is 0 * 100 = 0 / ROWSIZE SHOULD BE USEEEEEED!!!!!!
        
    function setIndex(index) {
      console.log('(3) setIndex() is running.');
      sortable.index = index; // sets the new index of the question  
      order.textContent = index + 1; // sets the text of the order element based on index of question
      
      (!dragger.isDragging) && layout(); // don't layout if you're dragging
    }
    
    function downAction() {
      // Called as soon as mouse moves 2px(dragging has begun)
      console.log('(4) downAction() is running.');
      animation.play(); // animates box-shadow, scale, translate3d(), paused
      this.update(); // updates the question(Draggable instance)'s y property to reflect its modified position
    }
    
    function dragAction() {
        // called every single time the mouse moves during drag
        console.log('(5) dragAction() is running.');
        // Calculate the current index based on element's position
        let index = clamp(Math.round(this.y / 100), 0, 2 - 1); // returns the index where the element should be placed among the order of questions ROWSIZE SHOULD BE USED!!!!!!!
        
        if (index !== sortable.index) { // if index is modified e.g. element is moved
          changeIndex(sortable, index, container); // change its index
        }
    }
    
    function upAction() {
      // called when the dragging ends
      console.log('(6) upAction() is running.');
      animation.reverse();
      layout();
    }
    
    function layout() {
      // creates a TweenLite instance, which animates the question element's specified values - y
      console.log('(7) layout() is running.');    
      TweenLite.to(element, 0.3, { y: sortable.index * 100 }); // rowSize instead of 100  
    }
        
    sortables.push(sortable);
  }
}