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
        let rowSize = 100; // => determines the height of a row. Used in layout() function
        let sortables = this.listQuestions.map(Sortable); // Array of sortables
        let total = sortables.length; // length of questions
        const container = this.container; // container ref

        TweenLite.to(container, 0.5, { autoAlpha: 1 });

        // const changeIndexL = changeIndex.bind(this);

        function changeIndex(item, to) {
            
            // Change position in array
            arrayMove(sortables, item.index, to);

            // Change element's position in DOM. Not always necessary. Just showing how.
            if (to === total - 1) {
                container.appendChild(item.element);    
            } else {
                var i = item.index > to ? to : to + 1;
                container.insertBefore(item.element, container.children[i]);
            }    
                
            // Set index for each sortable
            sortables.forEach((sortable, index) => sortable.setIndex(index));
        }

        function Sortable(element, index) {
            
            let content = element.querySelector(".item-content");
            let order   = element.querySelector(".order");
            
            let animation = TweenLite.to(content, 0.3, {
                boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                force3D: true,
                scale: 1.1,
                paused: true
            });
            
            let dragger = new Draggable(element, {        
                onDragStart: downAction,
                onRelease: upAction,
                onDrag: dragAction,
                cursor: "inherit",    
                type: "y"
            });
            
            // Public properties and methods
            let sortable = {
                dragger:  dragger,
                element:  element,
                index:    index,
                setIndex: setIndex
            };
            
            TweenLite.set(element, { y: index * rowSize });
                
            function setIndex(index) {
                
                sortable.index = index;    
                order.textContent = index + 1;
                
                // Don't layout if you're dragging
                if (!dragger.isDragging) layout();
            }
            
            function downAction() {
                animation.play();
                this.update();
            }
            
            function dragAction() {
                
                // Calculate the current index based on element's position
                let index = clamp(Math.round(this.y / rowSize), 0, total - 1);
                
                if (index !== sortable.index) {
                changeIndex(sortable, index);
                }
            }
            
            function upAction() {
                animation.reverse();
                layout();
            }
            
            function layout() {    
                TweenLite.to(element, 0.3, { y: sortable.index * rowSize });  
            }
                
            return sortable;
        }

        // Changes an elements's position in array
        function arrayMove(array, from, to) {
            array.splice(to, 0, array.splice(from, 1)[0]);
        }

        // Clamps a value to a min/max
        function clamp(value, a, b) {
            return value < a ? a : (value > b ? b : value);
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