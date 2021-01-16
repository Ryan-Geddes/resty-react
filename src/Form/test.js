import React, {useState, useEffect, useContext} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import Toast from 'react-bootstrap/Toast'
import Badge from 'react-bootstrap/Badge'
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

import {GlobalContext} from '../../context/global.js';

import './list.scss';

function List(props) {

  /* Davee's Pseudo code
  -declare states to use:
    [page, setPage]
    [pageArray, setPageArray]

  useEffect >> on page load
    -On page load we will have access to itemList
    -On page load we will also have access to global settings: defaultSort, itemsPerScreen, displayCompleted

    - Manipulate itemList so we can use it according to settings
      - Based on defaultSort, sort itemlist
      then, 
      - Based on itemsPerScreen, break items into array of arrays 
        - Set this into pageArray??
      - Based on displayCompleted, use When statement to display if true
  */


  const globalContext = useContext(GlobalContext);

  const [page, setPage] = useState(1);
  const [tempArray, setTempArray] = useState([])

  useEffect ( () => {
    let initial = itemPagina(props.itemList, page)
    setTempArray(initial);
  },[]);

  useEffect ( () => {
    let clickedPage = itemPagina(props.itemList, page)
    setTempArray(clickedPage);
  },[page]);

  function itemPagina(objArr, page){
    let itemPerPage = 3;
    let tempArr = props.itemList.slice((page*itemPerPage)-3, page*itemPerPage);
    return(tempArr);
  };

  function pageClick(pageClicked){
   setPage(pageClicked);
  }

  let renderList = tempArray.map((item)=> (
      <>
      <Toast key={item._id} onClose={() => props.makeDelete(item._id)}>
      <Toast.Header>
        <If condition={item.complete} >
          <Then>
            <Badge onClick={()=> props.makePut(item)} pill variant="danger">
              Complete
            </Badge>
          </Then>
          <Else>
            <Badge onClick={()=> props.makePut(item)} pill variant="success">
              Pending
            </Badge>
          </Else>
        </If>
        <strong className="mr-auto">  {item.assignee}</strong>
        <small>Difficulty: {item.difficulty}</small>
      </Toast.Header>
      <Toast.Body>{item.text}</Toast.Body>
      </Toast>
      
    </>
  ))

  let LiElement = ({value}) => (
    <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(value+1)}>{value+1}</a></li>
  )


    let ButtonList = ({array})=> {
      console.log('array from 86:', array);
      let length = array.length;
      let iterator = Math.ceil(length/3);

      let result = [];
      for(let i = 0; i <= iterator; i++){
        console.log('this ran');
        result.push(i);
        //result.push(<LiElement value={i}/>)
        // return <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(i+1)}>{i+1}</a></li>        
      }
      result.map((value, i) => (

        <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(value+1)}>{value+1}</a></li>
        // <LiElement value={i}/>
      ));
      
    };


  // const List = ({ itemArray }) => (
  //   <ul>
      
  //     itemArray.map((item, i) => (
  //       <ListItem key={mongo.dbkey} value={item} />
  //     ))}

  //   </ul>
  // );

  let renderButtons = (
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <ButtonList array={props.itemList} />
{/* 
      <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(1)}>1</a></li>
      <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(2)}>2</a></li>
      <li class="page-item" ><a class="page-link" href="#" onClick={()=> pageClick(3)}>3</a></li>
       */}
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
  )


  return(
    <>
      <ListGroup>
        {renderList}
        {renderButtons}
      </ListGroup>
    </>
  )

}



export default List;




// const ListItem = ({ value }) => <li>{value}</li>;

// const List = ({ items }) => (
//   <ul>
//     {items.map((item, i) => (
//       <ListItem key={mongo.dbkey} value={item} />
//     ))}
//   </ul>
// );

