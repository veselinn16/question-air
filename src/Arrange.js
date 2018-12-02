import React, { Component } from 'react';
import TweenLite from "gsap/TweenLite";
import Draggable from 'gsap/Draggable';

class Arrange extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.listQuestions = []; // Array of question elements
    }

    componentDidMount() {
        if(this.listQuestions.length > 0 ) {
        const rowSize = 100; // => determines the height of a row. Used in layout() function
        const sortables = this.listQuestions.map(Sortable); // array of questions
        let total = sortables.length; // length of questions array
        const container = this.container; // container ref
        console.log('1)variables are defined')

        TweenLite.to(container, 0.5, { autoAlpha: 1 }); //creates a TweenLite instance, which animates the container to the specified values from the current ones
        console.log('2) Tween is set');
        // const changeIndexL = changeIndex.bind(this);

        function changeIndex(item, to) {
            console.log('(1) changeIndex() is running.');
            // Change position in array
            arrayMove(sortables, item.index, to);

            // Change element's position in DOM. Not always necessary. Just showing how.
            if (to === total - 1) {
                container.appendChild(item.element); // if the question's index is equal to the total length of the questions array append the question to the container at the bottom
            } else {
                let i = item.index > to ? to : to + 1; // sets i based on whether the question's index is bigger than the old index or lower
                container.insertBefore(item.element, container.children[i]); // inserts the question before the index of the question which has to be after it
            }    
                
            // Set index for each sortable
            sortables.forEach((sortable, index) => sortable.setIndex(index));
        }

        function Sortable(element, index) {
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
            
            TweenLite.set(element, { y: index * rowSize }); // sets the position of the item based on its index. F.ex.: for the first question el is 0 * 100 = 0
                
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
                let index = clamp(Math.round(this.y / rowSize), 0, total - 1); // returns the index where the element should be placed among the order of questions
                
                if (index !== sortable.index) { // if index is modified e.g. element is moved
                    changeIndex(sortable, index); // change its index
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
                TweenLite.to(element, 0.3, { y: sortable.index * rowSize });  
            }
                
            return sortable;
        }

        function arrayMove(array, from, to) {
            // changes an elements's position in array
            console.log('(8) outside of Sortable arrayMove() is running.');    
            array.splice(to, 0, array.splice(from, 1)[0]);
        }

        function clamp(value, a, b) {
            // clamps a value to a min/max
            // maybe clamp is not the best name, place is better
            console.log('(9) outside of Sortable() clamp() is running.');    
            return value < a ? a : (value > b ? b : value); // value is the row, based on the location of the question element, and compares it with 0(first row) and value(the final row)
        }
    }
    }

    // changeIndex(item, to) {
            
    //     // Change position in array
    //     this.arrayMove(this.sortables, item.index, to);
    //     // Change element's position in DOM. Not always necessary. Just showing how.
    //     if (to === this.total - 1) {
    //         this.container.appendChild(item.element);    
    //     } else {
    //         var i = item.index > to ? to : to + 1;
    //         this.container.current.insertBefore(item.element, this.container.current.children[i]);
    //     }    
            
    //     // Set index for each sortable
    //     this.sortables.forEach((sortable, index) => sortable.setIndex(index));
    // }

    // Sortable(element, index) {
            
    //     let content = element.querySelector(".item-content");
    //     let order   = element.querySelector(".order");
        
    //     let animation = TweenLite.to(content, 0.3, {
    //         boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
    //         force3D: true,
    //         scale: 1.1,
    //         paused: true
    //     });
        
    //     let dragger = new Draggable(element, {        
    //         onDragStart: this.downAction,
    //         onRelease: this.upAction,
    //         onDrag: this.dragAction,
    //         cursor: "inherit",    
    //         type: "y"
    //     });
        
    //     // Public properties and methods
    //     let sortable = {
    //         dragger:  dragger,
    //         element:  element,
    //         index:    index,
    //         setIndex: this.setIndex
    //     };
        
    //     TweenLite.set(element, { y: index * this.rowSize });

    //     this.setIndex(index, order, dragger, sortable, element);

    //     this.downAction(animation);

    //     this.dragAction(sortable);

    //     this.upAction(animation);

    //     this.layout(element, sortable);
            
    //     return sortable;
    // }

    // setIndex(index, order, dragger, sortable, element) {            
    //     sortable.index = index;    
    //     order.textContent = index + 1;
        
    //     // Don't layout if you're dragging
    //     (!dragger.isDragging) && this.layout(element, sortable);
    // }

    // downAction(animation) {
    //     animation.play();
    //     this.update();
    // }

    // dragAction(sortable) {
            
    //     // Calculate the current index based on element's position
    //     let index = this.clamp(Math.round(this.y / this.rowSize), 0, this.total - 1);
        
    //     if (index !== sortable.index) {
    //         this.changeIndex(sortable, index);
    //     }
    // }

    // upAction(animation) {
    //     animation.reverse();
    //     this.layout();
    // }

    // layout(element, sortable) {    
    //     TweenLite.to(element, 0.3, { y: sortable.index * this.rowSize });  
    // }

    // arrayMove(array, from, to) {
    //     array.splice(to, 0, array.splice(from, 1)[0]);
    // }

    // clamp(value, a, b) {
    //     return value < a ? a : (value > b ? b : value);
    // }

    render() {
        return (
            // this.props.questions.length > 0 ?
            //  <div className="q_container">
            //     <ol className='qs'>
            //         {this.props.questions.map((question, i) => {
            //           return <li key={i} className='q' draggable='true'>{i + 1} {question.question}</li>  
            //         })}
            //     </ol>                
            // </div> : <h1>Enter questions please!</h1>
            this.props.questions.length > 0 ?
            <div className="container-arrange" ref={container => this.container = container}>
                {this.props.questions.map((question, i) => {
                return <div className="list-item" key={i} ref={question => this.listQuestions[i] = question}>
                            <div className="item-content">
                                <span className='order'>{i + 1}</span> {question.question}
                            </div>
                        </div>})}
            </div>            
            : <h1>Enter questions please!</h1>
        )
    }
}

export default Arrange;